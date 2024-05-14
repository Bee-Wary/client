import { generateDataApiUrl, generateDataSource, generateRequestHeaders } from "@/utils/dataApi";

/**
 * Fetches all inspections from the database and summerizes them for use in the homepage
 * @returns a summerized overview of the inspections
 */
export async function getSummerizedInspections(): Promise<{ documents: SummerizedInspection[] }> {
  try {
    const response = await fetch(generateDataApiUrl("find"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("inspections"),
        "sort": {
          "draft": -1,
          "last_updated": -1
        },
        "projection": {
          "_id": 1,
          "frames": 0,
          "medication": 0,
          "creation_date": 0,
          "illness": 0
        }
      })
    })
    return response.json();
  } catch (e) {
    throw new Error(`Realm Data API returned an error: ${e}`)
  }
}