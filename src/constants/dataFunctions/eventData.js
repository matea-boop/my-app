import axios from "axios";

export default async function getEventDataFromDB() {
  const url = "http://localhost:3001/api/events";
  try {
    const {
      data: { events },
    } = await axios.get(url);

    return events;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
