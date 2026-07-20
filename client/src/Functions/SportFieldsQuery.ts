import axios from "./axios";

export async function getSportFieldsWithSport(state: (data: any) => void, sport: string) {
  try {
    const { data } = await axios.get(`/sportfields/sport/${sport}`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
    });
    state(data);
  } catch (error) {
    console.error(error);
    throw new Error("Algo salió mal :(");
  }
}
