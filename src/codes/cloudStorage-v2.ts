type File = {
  name: string
  size: string
  user: string | null
}

type User = {
  id: string
  capacity: number
  usedCapacity: number
}

type Operations = {
  [key: string]: (params: any[]) => string
}

type Storage = Map<string, File>
type UserStorage = Map<string, User>

const storage: Storage = new Map()
const users: UserStorage = new Map()

const operations: Operations = {
  ADD_FILE: ([name, size]) => {
    if (storage.has(name)) {
      return "false"
    }

    const newFile: File = { name, size, user: null }
    storage.set(name, newFile)

    return "true"
  },

  COPY_FILE: ([nameFrom, nameTo]) => {
    const fileFrom = storage.get(nameFrom)
    const fileTo = storage.get(nameTo)
    if (!fileFrom || fileTo) return "false"

    const user = fileFrom.user ? users.get(fileFrom.user) : null
    if (user && user.usedCapacity + Number(fileFrom.size) > user.capacity)
      return "false"

    if (user) user.usedCapacity += Number(fileFrom.size)
    storage.set(nameTo, { ...fileFrom, name: nameTo })
    return "true"
  },

  GET_FILE_SIZE: ([name]) => {
    const file = storage.get(name)
    return file ? file.size : ""
  },

  FIND_FILE: ([prefix, sufix]) => {
    const filesMatch: File[] = Array.from(storage.values()).filter(
      (file) => file.name.startsWith(prefix) && file.name.endsWith(sufix)
    )
    filesMatch.sort(
      (a, b) => Number(b.size) - Number(a.size) || a.name.localeCompare(b.name)
    )
    return filesMatch.map((file) => `${file.name}(${file.size})`).join(", ")
  },

  ADD_USER: ([userId, userCapacity]) => {
    if (users.has(userId)) {
      return "false"
    }

    const newUser: User = {
      id: userId,
      capacity: Number(userCapacity),
      usedCapacity: 0,
    }
    users.set(userId, newUser)

    return "true"
  },

  ADD_FILE_BY: ([userId, name, size]) => {
    const file = storage.get(name)
    const user = users.get(userId)
    if (!file && user) {
      const newUsedCapacity = user.usedCapacity + Number(size)
      if (newUsedCapacity <= Number(user.capacity)) {
        storage.set(name, { name, size, user: userId })
        user.usedCapacity = newUsedCapacity
        return String(Number(user.capacity) - newUsedCapacity)
      }
    }
    return ""
  },

  UPDATE_CAPACITY: ([userId, capacity]) => {
    const user = users.get(userId)
    if (!user) {
      return ""
    }

    const newCapacity = Number(capacity)
    let removedFiles = 0

    user.capacity = newCapacity

    if (user.usedCapacity > newCapacity) {
      const userFiles: File[] = Array.from(storage.values()).filter(
        (file) => file.user === userId
      )

      userFiles.sort(
        (a, b) =>
          Number(b.size) - Number(a.size) || a.name.localeCompare(b.name)
      )

      while (user.usedCapacity > newCapacity && userFiles.length) {
        const removedFile = userFiles.shift()
        if (removedFile) {
          storage.delete(removedFile.name)
          user.usedCapacity -= Number(removedFile.size)
          removedFiles += 1
        }
      }
    }

    return String(removedFiles)
  },
}

export function solution(queries: string[][]): string[] {
  const results: string[] = []

  for (const query of queries) {
    const [operation, ...params] = query
    const result = operations[operation](params)
    results.push(result)
  }

  return results
}
