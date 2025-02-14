import dayjs from 'dayjs'
import NotePreview from '@/components/NotePreview'
import EditButton from '@/components/EditButton'
export default function Note({ noteId, note }) {
  const { title, content, updateTime } = note

  return (
    <div className='bg-white shadow-[0_0_5px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.1)] rounded-lg h-[95%] w-[95%] min-w-[400px] p-5 overflow-y-auto'>
      <div className='flex justify-between items-center'>
        <div className='grow flex justify-between break-words' role='menubar'>
          <small className='text-[#65676b] whitespace-nowrap ' role='status'>
            Last updated on {dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
          </small>
          <EditButton noteId={noteId}>Edit</EditButton>
        </div>
      </div>
      <h1 className='leading-snug grow break-words mt-3 text-7xl'>{title}</h1>
      <NotePreview>{content}</NotePreview>
    </div>
  )
}
