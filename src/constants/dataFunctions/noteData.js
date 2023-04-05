import axios from "axios";

export default async function getNotesDataFromDB() {
  const url = "http://localhost:3001/api/notes";
  try {
    const {
      data: { notes },
    } = await axios.get(url);

    return notes;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
