import { readdir, stat } from 'fs/promises';
import { join } from 'path';

/**
 * Recursively generates a tree-like object of a folder structure, two levels deep.
 * The function assumes a structure of `level1/level2/files`.
 *
 * @param {string} folderPath The path to the top-level directory.
 * @returns {Promise<object>} A promise that resolves to an object representing the folder tree.
 * @throws {Error} If the provided path is not a directory or an error occurs during file system operations.
 */
export async function getTree(folderPath) {
  const tree = {};

  try {
    const topLevelEntries = await readdir(folderPath, { withFileTypes: true });

    for (const entry of topLevelEntries) {
      // Check if the entry is a directory
      if (entry.isDirectory()) {
        const firstLevelDirPath = join(folderPath, entry.name);
        const secondLevelDirContents = await readdir(firstLevelDirPath, { withFileTypes: true });

        // Initialize the object for the first-level directory
        if (!tree[entry.name]) {
          tree[entry.name] = {};
        }

        for (const subEntry of secondLevelDirContents) {
          // Check if the sub-entry is a directory
          if (subEntry.isDirectory()) {
            const secondLevelDirPath = join(firstLevelDirPath, subEntry.name);
            const files = await readdir(secondLevelDirPath);

            // Add the second-level directory and its files to the tree
            tree[entry.name][subEntry.name] = files;
          }
        }
      }
    }
    return tree;
  } catch (err) {
    console.log('##### ERROR IN UTILS.JS')
    console.error(`Error reading folder tree at ${folderPath}:`, err);
    //throw err;
  }
}

// Example usage:
// To run this example, ensure you have a directory structure like:
// example_folder/
// ├── dir_1/
// │   ├── sub_dir_a/
// │   │   ├── file_1.txt
// │   │   └── file_2.md
// │   └── sub_dir_b/
// │       └── file_3.js
// └── dir_2/
//     └── sub_dir_c/
//         └── file_4.py

// import { getTree } from './folder_tree.js'; // Adjust path if needed

// const examplePath = './example_folder'; // Make sure this path exists

// getTree(examplePath)
//   .then(tree => {
//     console.log(JSON.stringify(tree, null, 2));
//   })
//   .catch(err => {
//     console.error('Failed to get folder tree:', err);
//   });
