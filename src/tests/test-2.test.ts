import { solution as solutionv1 } from "../codes/cloudStorage-v1"
import { solution as solutionv2 } from "../codes/cloudStorage-v2"

describe("Storage solution", () => {
  it("should perform storage operations correctly", () => {
    const queries = [
      ["ADD_FILE", "/root/dir/another_dir/file.mp3", "10"],
      ["ADD_FILE", "/root/file.mp3", "5"],
      ["ADD_FILE", "/root/music/file.mp3", "7"],
      ["COPY_FILE", "/root/music/file.mp3", "/root/dir/file.mp3"],
      ["FIND_FILE", "/root", ".mp3"],
      ["FIND_FILE", "/root", "file.txt"],
      ["FIND_FILE", "/dir", "File.mp3"],
    ]

    const expectedResult = [
      "true",
      "true",
      "true",
      "true",
      "/root/dir/another_dir/file.mp3(10), /root/dir/file.mp3(7), /root/music/file.mp3(7), /root/file.mp3(5)",
      "",
      "",
    ]

    expect(solutionv1(queries)).toEqual(expectedResult)
    expect(solutionv2(queries)).toEqual(expectedResult)
  })
})
