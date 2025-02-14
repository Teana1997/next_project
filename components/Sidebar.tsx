import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllNotes } from '@/lib/prisma'
import SidebarNoteList from '@/components/SidebarNoteList'
import EditButton from '@/components/EditButton'
import NoteListSkeleton from '@/components/NoteListSkeleton'
import SidebarSearchField from '@/components/SidebarSearchField'
import SidebarImport from '@/components/SidebarImport'

export default async function Sidebar() {
  const notes = await getAllNotes()

  return (
    <>
      <section className='col sidebar'>
        <Link href={'/'} className='link--unstyled'>
          <section className='sidebar-header'>
            <Image
              className='logo'
              src='/logo.svg'
              width={22}
              height={20}
              alt=''
              role='presentation'
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className='sidebar-menu' role='menubar'>
          <SidebarSearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList notes={notes} />
          </Suspense>
        </nav>
        <SidebarImport />
      </section>
    </>
  )
}
