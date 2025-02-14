import { PrismaClient } from '@prisma/client'
// import { auth } from 'auth'

/**
 * 创建 Prisma 客户端实例
 *
 * @returns 返回 Prisma 客户端实例
 */
const createPrismaClient = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })

/**
 * 为全局作用域（globalThis）定义一个类型断言，以便能够安全地访问全局的 Prisma 客户端实例。
 * 这里将 globalThis 断言为一个对象，该对象可能包含一个名为 'prisma' 的属性，
 * 该属性是 createPrismaClient 函数的返回类型的实例，或者为 undefined。
 */
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getAllNotes() {
  // const session = await auth()
  // if (session == null) return []
  // 查找登录用户的笔记
  const notes = await prisma.note.findMany({
    // where: {
    //   // authorId: session?.user?.userId
    //   authorId: '1702459181837'
    // }
  })
  // 构造返回数据
  const res = {}
  notes.forEach(({ title, content, id, updatedAt }) => {
    res[id] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  })
  return res
}

export async function addNote(data) {
  // const session = await auth()
  const result = await prisma.note.create({
    data: {
      title: JSON.parse(data).title,
      content: JSON.parse(data).content
    }
  })

  return result.id
}

export async function updateNote(uuid, data) {
  const parsedData = JSON.parse(data)
  await prisma.note.update({
    where: {
      id: '1702459181837'
    },
    data: {
      title: parsedData.title,
      content: parsedData.content
    }
  })
}

export async function getNote(uuid: string) {
  // const session = await auth()
  // if (session == null) return
  const { title, content, updateTime, id } = await prisma.note.findFirst({
    where: {
      id: uuid
    }
  })

  return {
    title,
    content,
    updateTime,
    id
  }
}

export async function delNote(uuid) {
  await prisma.note.delete({
    where: {
      id: uuid
    }
  })
}

export async function addUser(username, password) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      notes: {
        create: []
      }
    }
  })

  return {
    name: username,
    username,
    userId: user.id
  }
}

export async function getUser(username, password) {
  const user = await prisma.user.findFirst({
    where: {
      username
    },
    include: {
      notes: true
    }
  })
  if (!user) return 0
  if (user.password !== password) return 1
  return {
    name: username,
    username,
    userId: user.id
  }
}

export default prisma
