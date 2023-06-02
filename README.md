# Participation in a Coding Test

Recently, I participated in a coding test where the task was to implement a simple cloud storage system, written entirely in TypeScript. The test had multiple levels, with each level demanding an incremental feature set to be implemented on the system. I made it to almost completing level 3, but a TypeScript error in the final moments prevented me from proceeding further.

The challenge was one hour long, during which I implemented the features specified for Level 1, 2 and 3. In my subsequent revisions, I refined the code, making it more readable and efficient, which I refer to as version 2.

The tests were pre-provided, and my implementation successfully passed all the levels up to Level 3. Here's a summary of what each level involved:

## Level 1

The first level of the coding challenge involved the implementation of basic file operations in the cloud storage system. The operations that were required to be implemented are as follows:

1. **ADD_FILE <name> <size>**: This operation is meant to add a new file to the storage system. The parameters provided include the name and size (in bytes) of the new file. The operation is designed to fail and return "false" if a file with the same name already exists in the system. However, if the addition of the new file is successful, the operation should return "true".

2. **COPY_FILE <nameFrom> <nameTo>**: This operation is required to copy an existing file, identified by `nameFrom`, to a new file identified by `nameTo`. The operation is designed to fail if the file identified by `nameFrom` does not exist, or if it points to a directory instead of a file. It will also fail if a file with the same name as `nameTo` already exists. If the copy operation is successful, it should return "true", else it should return "false".

3. **GET_FILE_SIZE <name>**: This operation is designed to retrieve the size of a specific file, identified by `name`. If the file exists, it should return a string that represents the size of the file. However, if the file does not exist, the operation should return an empty string.

## Level 2

The second level of the coding challenge expanded upon the cloud storage system's functionalities by requiring implementation of a file search operation. The operation had to be capable of finding files based on prefix and suffix matches. Here is the operation required:

1. **FIND_FILE <prefix> <suffix>**: This operation is meant to find files whose names begin with the provided `prefix` and end with the `suffix`. Upon a successful search, it should return a string listing all matching files in the following format: "<name1> (<size1>), <name2> (<size2>), ...". The output should be sorted in descending order based on file sizes. In case of a tie in file sizes, the files should be sorted lexicographically. If no files match the provided `prefix` and `suffix`, the operation should return an empty string.

## Level 3

The third level of the coding challenge introduced the concept of users into the cloud storage system. This was a significant addition as it required adapting the existing file operations to account for user-specific rules, such as individual storage capacity limits. Implementing these changes within the one-hour timeframe was quite challenging, mainly because it required reworking some of the logic from the previous levels. The operations to be implemented are as follows:

1. **ADD_USER <userId> <capacity>**: This operation is designed to add a new user to the system, along with a storage capacity limit (in bytes). The total size of all files owned by a user (identified by `userId`) should not exceed this capacity limit. The operation should fail and return "false" if a user with the same `userId` already exists. If the user is successfully added, the operation should return "true".

2. **ADD_FILE_BY <userId> <name> <size>**: This operation behaves similarly to the ADD_FILE operation from Level 1, but with the addition of file ownership. The file added by this operation is owned by the user identified by `userId`. A new file cannot be added if it would cause the user to exceed their capacity limit. If the file is added successfully, the operation should return a string representing the remaining storage capacity for `userId`. If the file cannot be added, the operation should return an empty string.

   Note: All queries calling the ADD_FILE operation implemented during Level 1 are run by the user with `userId` = "admin", who has unlimited storage capacity. Also, the COPY_FILE operation preserves the ownership of the original file.

3. **UPDATE_CAPACITY <userId> <capacity>**: This operation changes the maximum storage capacity for the user identified by `userId`. If the total size of all the user's files exceeds the new capacity, the largest files (sorted lexicographically in case of a tie) should be removed from the storage until the total size of the remaining files no longer exceeds the new capacity. The operation should return a string representing the number of removed files, or an empty string if a user with `userId` does not exist.

## Level 4

While I couldn't access this level due to the time, this level would have presumably demanded the support for file compression and decompression in the storage system.

## Conclusion

Overall, participating in this coding test was a highly beneficial experience for me. It was a complex yet interesting challenge, demanding both a deep understanding of TypeScript and the ability to design a flexible, multi-level cloud storage system. The addition of user-specific rules in Level 3 was particularly challenging and was a valuable lesson in anticipating and managing the evolution of system requirements.

This experience has reinforced my desire to engage in more such coding challenges. Not only do they provide opportunities for sharpening my problem-solving and coding skills, but they also offer insights into the kind of complex tasks that I might need to handle as a Senior Developer.

I believe that through continuous learning, practice, and exposure to a variety of coding problems, I will be better prepared to pursue a Senior Developer role and contribute effectively in that capacity.
