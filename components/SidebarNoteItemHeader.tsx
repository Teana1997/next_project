import dayjs from 'dayjs'

export default function SidebarNoteItemHeader({
  title,
  updateTime
}: {
  title: string
  updateTime: Date
}) {
  return (
    <header className='z-[1] max-w-[85%] pointer-events-none'>
      <strong className='block text-ellipsis text-xl whitespace-nowrap overflow-hidden'>
        {title}
      </strong>
      <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
    </header>
  )
}
