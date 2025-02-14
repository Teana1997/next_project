// components/EditButton.js
import Link from 'next/link'

export default function EditButton({
  noteId,
  children
}: {
  noteId: string | null
  children: string
}) {
  const isDraft = noteId == null
  return (
    <Link href={`/note/edit/${noteId || ''}`}>
      <button
        className={['edit-button', isDraft ? 'edit-button--solid' : 'edit-button--outline'].join(
          ' '
        )}
        // className={`rounded-[100px] tracking-[.12em] px-5 pt-[6px] pb-2 cursor-pointer font-bold outline-none ${isDraft ? 'bg-[#037dba]' : 'bg-white'} ${!isDraft ? 'text-[#037dba]' : 'text-white'} ${isDraft ? 'border-none' : 'border-solid border-[1px] border-[#037dba]'}`}
        role='menuitem'
      >
        {children}
      </button>
    </Link>
  )
}
