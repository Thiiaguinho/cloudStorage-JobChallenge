import { solution as solutionv1 } from "../codes/cloudStorage-v1"
import { solution as solutionv2 } from "../codes/cloudStorage-v2"

describe("Storage solution", () => {
  it("should perform storage operations of Lvl 1 - correctly", () => {
    const queries = [
      ["ADD_FILE", "/dir1/dir2/file.txt", "10"],
      ["COPY_FILE", "/not-existing.file", "/dir1/file.txt"],
      ["COPY_FILE", "/dir1/dir2/file.txt", "/dir1/file.txt"],
      ["ADD_FILE", "/dir1/file.txt", "15"],
      ["COPY_FILE", "/dir1/file.txt", "/dir1/dir2/file.txt"],
      ["GET_FILE_SIZE", "/dir1/file.txt"],
      ["GET_FILE_SIZE", "/not-existing.file"],
    ]
    const expectedResult = ["true", "false", "true", "false", "false", "10", ""]
    expect(solutionv1(queries)).toEqual(expectedResult)
    expect(solutionv2(queries)).toEqual(expectedResult)
  })
})
