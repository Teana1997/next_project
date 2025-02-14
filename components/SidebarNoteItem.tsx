import SidebarNoteItemContent from '@/components/SidebarNoteItemContent'
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader'

type Note = {
  title: string
  content?: string
  updateTime: Date
}

export default function SidebarNoteItem({
  noteId,
  note
}: {
  noteId: string
  note: Note
}): React.ReactNode {
  const { title, content = '', updateTime } = note

  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={
        <p className='pointer-events-none z-[2] flex-1 basis-[250px] text-[#65676b] relative animation animate-[slideIn_100ms]'>
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  )
}
