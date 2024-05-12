import { generateDataApiUrl, generateDataSource, generateRequestHeaders } from "@/utils/dataApi";

export async function getAllBeehives(): Promise<{ documents: Beehive[] }> {
  try {
    const response = await fetch(generateDataApiUrl("find"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("beehives")
      })
    })
    return response.json();
  } catch (e) {
    throw new Error(`Realm Data API returned an error: ${e}`)
  }
}