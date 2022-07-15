import fs from 'fs/promises'

export async function readData(path) {
  try {
    const contents = await fs.readFile(path)
    return JSON.parse(contents.toString());
  } catch (error) {
    console.log(error);
    process.exit(1);
  }  
}

export async function writeData(path, data) {
  try {
    await fs.writeFile(path, JSON.stringify(data))
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

