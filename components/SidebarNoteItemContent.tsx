'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren
}: {
  id: string
  title: string
  children: React.ReactNode
  expandedChildren: React.ReactNode
}): React.ReactNode {
  const router = useRouter()
  const pathname = usePathname()
  const selectedId = pathname?.split('/')[1] || null

  const [isPending] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = id === selectedId

  // Animate after title is edited.
  const itemRef = useRef(null)
  const prevTitleRef = useRef(title)

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title
      itemRef?.current.classList.add('flash')
    }
  }, [title])

  return (
    <div
      className={`flex p-4 justify-between items-start ${isExpanded ? 'max-h-[300px]' : 'max-h-[100px]'} flex-wrap relative mb-3 w-[97%] mx-auto`}
    >
      {children}
      <button
        className='absolute inset-y-0 inset-x-0 w-full z-0 border-none rounded-md text-start bg-[#f0f2f5] cursor-pointer outline-[none] text-transparent text-[0]'
        style={{
          backgroundColor: isPending ? 'var(--gray-80)' : isActive ? 'var(--tertiary-blue)' : '',
          border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent'
        }}
        onClick={() => {
          const sidebarToggle = document.getElementById('sidebar-toggle')
          if (sidebarToggle) {
            sidebarToggle.checked = true
          }
          router.push(`/note/${id}`)
        }}
      >
        Open note for preview
      </button>
      <button
        className='z-[2] rounded-[50%] h-5 w-5 border-solid border border-[#fff] cursor-pointer shrink-0 opacity-1 outline-none shadow-[0_0_0_2px_#0396df] visible'
        onClick={e => {
          e.stopPropagation()
          setIsExpanded(!isExpanded)
        }}
      >
        {isExpanded ? (
          <Image src='/chevron-down.svg' width={16} height={16} alt='Collapse' />
        ) : (
          <Image src='/chevron-up.svg' width={16} height={16} alt='Expand' />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  )
}
