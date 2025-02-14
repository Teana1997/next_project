'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/prisma'
import { stat, mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import mime from 'mime'
import dayjs from 'dayjs'
import { revalidatePath } from 'next/cache'

export async function saveNote(noteId, title, body) {
  const data = JSON.stringify({
    title,
    content: body,
    updateTime: new Date()
  })

  if (noteId) {
    updateNote(noteId, data)
    redirect(`/note/${noteId}`)
  } else {
    const res = await addNote(data)
    redirect(`/note/${res}`)
  }
}

export async function deleteNote(noteId: string) {
  delNote(noteId)
  redirect('/')
}

export async function importNote(formData) {
  const file = formData.get('file')

  // 空值判断
  if (!file) {
    return { error: 'File is required.' }
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer())
  const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}`
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir)

  try {
    await stat(uploadDir)
  } catch (e) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true })
    } else {
      console.error(e)
      return { error: 'Something went wrong.' }
    }
  }

  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`
    const filename = file.name.replace(/\.[^/.]+$/, '')
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(file.type)}`
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer)

    // 调用接口，写入数据库
    const res = await addNote(
      JSON.stringify({
        title: filename,
        content: buffer.toString('utf-8')
      })
    )

    // 清除缓存
    revalidatePath('/', 'layout')

    return { fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res }
  } catch (e) {
    console.error(e)
    return { error: 'Something went wrong.' }
  }
}
