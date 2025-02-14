import SidebarNoteListFilter from '@/components/SidebarNoteListFilter'
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader'

type InitialData = {
  notes: { [key: string]: string }
}

export default async function NoteList(notes: InitialData) {
  const notesNew = notes.notes

  const arr = Object.entries(notesNew)

  if (arr.length == 0) {
    return <div className='p-4'>{'No notes created yet!'}</div>
  }

  return (
    // <ul className='py-4 px-0'>
    //   {arr.map(([noteId, note]) => (
    //     <li key={noteId}>
    //       <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
    //     </li>
    //   ))}
    // </ul>
    <SidebarNoteListFilter
      notes={arr.map(([noteId, note]) => {
        const noteData = JSON.parse(note)
        return {
          noteId,
          note: noteData,
          header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />
        }
      })}
    />
  )
}
