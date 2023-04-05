import axios from "axios";

export default async function getFileDataFromDB() {
  const url = "http://localhost:3001/api/files";

  try {
    const {
      data: { files },
    } = await axios.get(url);

    return files;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
