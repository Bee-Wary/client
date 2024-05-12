import { generateDataApiUrl, generateDataSource, generateRequestHeaders } from "@/utils/dataApi";

/**
 * Returns a summerized overview of the beehives, preformatted for the home page
 * TODO: Added sensor connectivity (But how will we represent this in the data model?)
 * @returns Summerized overview of hives
 */
export async function getAllBeehives(): Promise<{ documents: SummerizedBeehives[] }> {
  try {
    const response = await fetch(generateDataApiUrl("aggregate"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("beehives"),
        "pipeline": [
          {
            "$lookup": {
              "as": "inspections",
              "from": "inspections",
              "foreignField": "ref_beehive",
              "localField": "_id",
              "pipeline": [
                {
                  "$sort": {
                    "last_updated": -1
                  }
                },
                {
                  "$limit": 1
                },
                {
                  "$project": {
                    "_id": 0,
                    "illness": 1,
                    "last_updated": 1
                  }
                }
              ]
            }
          },
          {
            "$unwind": {
              "path": "$inspections",
              "preserveNullAndEmptyArrays": true
            }
          },
          {
            "$project": {
              "name": 1,
              "location": 1,
              "ilness": {
                "$ifNull": [
                  true,
                  false
                ]
              },
              "last_updated": {
                "$ifNull": [
                  "$inspections.last_updated",
                  null
                ]
              }
            }
          }
        ]
      })
    })
    return response.json();
  } catch (e) {
    throw new Error(`Realm Data API returned an error: ${e}`)
  }
}