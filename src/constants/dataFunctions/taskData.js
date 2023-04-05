import axios from "axios";

export default async function getTaskDataFromDB() {
  const url = "http://localhost:3001/api/tasks";
  try {
    const {
      data: { tasks },
    } = await axios.get(url);

    return tasks;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
