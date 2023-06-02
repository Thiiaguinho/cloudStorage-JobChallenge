import { solution as solutionv1 } from "../codes/cloudStorage-v1"
import { solution as solutionv2 } from "../codes/cloudStorage-v2"

describe("Storage solution", () => {
  it("should perform user and file operations correctly", () => {
    const queries = [
      ["ADD_USER", "user1", "125"],
      ["ADD_USER", "user1", "100"],
      ["ADD_USER", "user2", "100"],
      ["ADD_FILE_BY", "user1", "/dir/file.big", "50"],
      ["ADD_FILE_BY", "user1", "/file.med", "30"],
      ["ADD_FILE_BY", "user2", "/file.med", "40"],
      ["COPY_FILE", "/file.med", "/dir/another/file.med"],
      ["COPY_FILE", "/file.med", "/dir/another/another/file.med"],
      ["ADD_FILE_BY", "user1", "/dir/file.small", "10"],
      ["ADD_FILE", "/dir/admin_file", "200"],
      ["ADD_FILE_BY", "user1", "/dir/file.small", "5"],
      ["ADD_FILE_BY", "user1", "/my_folder/file.huge", "100"],
      ["ADD_FILE_BY", "user3", "/my_folder/file.huge", "100"],
      ["UPDATE_CAPACITY", "user1", "300"],
      ["UPDATE_CAPACITY", "user1", "50"],
      ["UPDATE_CAPACITY", "user2", "1000"],
    ]
    const expectedResult = [
      "true",
      "false",
      "true",
      "75",
      "45",
      "",
      "true",
      "false",
      "5",
      "true",
      "",
      "",
      "",
      "0",
      "2",
      "0",
    ]

    expect(solutionv1(queries)).toEqual(expectedResult)
    expect(solutionv2(queries)).toEqual(expectedResult)
  })
})
