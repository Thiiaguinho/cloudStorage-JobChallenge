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

type Storage = Map<string, File>
type UserStorage = Map<string, User>

export function solution(queries: string[][]): string[] {
  const storage: Storage = new Map()
  const users: UserStorage = new Map()

  const results: string[] = []

  for (const query of queries) {
    const [operation] = query
    switch (operation) {
      case "ADD_FILE": {
        const [, name, size] = query
        const file = storage.get(name)
        if (file) {
          results.push("false")
        } else {
          storage.set(name, { name, size, user: null })
          results.push("true")
        }
        break
      }
      case "COPY_FILE": {
        const [, nameFrom, nameTo] = query
        const fileFrom = storage.get(nameFrom)
        if (fileFrom) {
          const fileTo = storage.get(nameTo)
          if (fileTo) {
            results.push("false")
          } else {
            let allowSet = true

            if (fileFrom.user) {
              const user = users.get(fileFrom.user)
              if (
                user &&
                user.usedCapacity + Number(fileFrom.size) < user.capacity
              ) {
                user.usedCapacity += Number(fileFrom.size)
              } else {
                allowSet = false
              }
            }

            if (allowSet) {
              storage.set(nameTo, {
                name: nameTo,
                size: fileFrom.size,
                user: fileFrom.user,
              })
              results.push("true")
            } else {
              results.push("false")
            }
          }
        } else {
          results.push("false")
        }
        break
      }
      case "GET_FILE_SIZE": {
        const [, name] = query
        const file = storage.get(name)
        if (file) {
          results.push(file.size)
        } else {
          results.push("")
        }
        break
      }
      case "FIND_FILE": {
        const [, prefix, sufix] = query
        const filesMatch: File[] = []

        for (const [name, file] of storage) {
          const match = name.startsWith(prefix) && name.endsWith(sufix)
          if (match) {
            filesMatch.push(file)
          }
        }
        filesMatch.sort(
          (a, b) =>
            Number(b.size) - Number(a.size) || a.name.localeCompare(b.name)
        )
        results.push(
          filesMatch.map((file) => `${file.name}(${file.size})`).join(", ")
        )
        break
      }
      case "ADD_USER": {
        const [, userId, userCapacity] = query
        const user = users.get(userId)
        if (user) {
          results.push("false")
        } else {
          users.set(userId, {
            id: userId,
            capacity: Number(userCapacity),
            usedCapacity: 0,
          })
          results.push("true")
        }
        break
      }
      case "ADD_FILE_BY": {
        const [, userId, name, size] = query
        let result = ""

        const file = storage.get(name)

        if (!file) {
          const user = users.get(userId)
          if (user) {
            const newUsedCapacity = user.usedCapacity + Number(size)
            if (newUsedCapacity < Number(user.capacity)) {
              storage.set(name, { name, size, user: userId })
              users.set(userId, {
                ...user,
                usedCapacity: newUsedCapacity,
              })
              result = String(Number(user.capacity) - newUsedCapacity)
            }
          }
        }
        results.push(result)
        break
      }
      case "UPDATE_CAPACITY": {
        const [, userId, capacity] = query
        const user = users.get(userId)
        let removedFiles = 0

        if (user) {
          user.capacity = Number(capacity)

          if (user.usedCapacity > user.capacity) {
            const userFiles: File[] = []

            for (const [name, file] of storage) {
              if (file.user === userId) {
                userFiles.push(file)
              }
            }

            userFiles.sort(
              (a, b) =>
                Number(b.size) - Number(a.size) || a.name.localeCompare(b.name)
            )

            while (user.usedCapacity > user.capacity) {
              const removedFile = userFiles.shift()
              if (removedFile) {
                storage.delete(removedFile.name)
                user.usedCapacity -= Number(removedFile.size)
                removedFiles += 1
              }
            }
          }
          results.push(String(removedFiles))
        } else {
          results.push("")
        }
      }
    }
  }

  return results
}
