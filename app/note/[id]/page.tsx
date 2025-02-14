import Note from '@/components/Note'
import { getNote } from '@/lib/prisma'

export default async function Page({ params }) {
  // 动态路由 获取笔记 id
  const noteId = params.id
  const note = await getNote(noteId)

  // 为了让 Suspense 的效果更明显
  const sleep = ms => new Promise(r => setTimeout(r, ms))
  await sleep(5000)

  if (note == null) {
    return (
      <div className='my-5'>
        <span className='text-2xl'>Click a note on the left to view something! 🥺</span>
      </div>
    )
  }

  return <Note noteId={noteId} note={note} />
}
