export default function NoteListSkeleton() {
  return (
    <div>
      <ul className='py-4 px-0 mx-auto  '>
        <li className=' py-0 px-4 '>
          <div
            className='py-4  justify-between items-start max-h-[100px] flex-wrap relative mb-3  h-full bg-[#eee] bg-custom-gradient bg-[length:200px_100%] bg-no-repeat rounded-[4px] block leading-none  text-transparent animate-[shimmer_1.2s_ease-in-out_infinite] '
            style={{ height: '5em' }}
          />
        </li>
        <li className=' py-0 px-4'>
          <div
            className=' p-4 justify-between items-start max-h-[100px] flex-wrap relative mb-3  h-full bg-[#eee] bg-custom-gradient bg-[length:200px_100%] bg-no-repeat rounded-[4px] block leading-none  text-transparent animate-[shimmer_1.2s_ease-in-out_infinite] '
            style={{ height: '5em' }}
          />
        </li>
        <li className=' py-0 px-4'>
          <div
            className='p-4 justify-between items-start max-h-[100px] flex-wrap relative mb-3  h-full bg-[#eee] bg-custom-gradient bg-[length:200px_100%] bg-no-repeat rounded-[4px] block leading-none  text-transparent animate-[shimmer_1.2s_ease-in-out_infinite] '
            style={{ height: '5em' }}
          />
        </li>
      </ul>
    </div>
  )
}
