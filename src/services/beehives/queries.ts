import { generateDataApiUrl, generateDataSource, generateRequestHeaders } from "@/utils/dataApi";

/**
 * Returns a summerized overview of the beehives, preformatted for the home page
 * @returns Summerized overview of hives
 */
export async function getSummerizedBeehives(): Promise<{ documents: SummerizedBeehive[] }> {
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
                }, {
                  "$limit": 1
                }, {
                  "$project": {
                    "_id": 0, 
                    "illness": 1, 
                    "last_updated": 1
                  }
                }
              ]
            }
          }, {
            "$lookup": {
              "from": "sensors", 
              "localField": "sensor_ref", 
              "foreignField": "metadata.sensorId", 
              "as": "sensors", 
              "pipeline": [
                {
                  "$sort": {
                    "timestamp": -1
                  }
                }, {
                  "$limit": 1
                }, {
                  "$project": {
                    "_id": 0, 
                    "timestamp": 1, 
                    "metadata.sensorId": 1
                  }
                }
              ]
            }
          }, {
            "$unwind": {
              "path": "$inspections", 
              "preserveNullAndEmptyArrays": true
            }
          }, {
            "$unwind": {
              "path": "$sensors", 
              "preserveNullAndEmptyArrays": true
            }
          }, {
            "$project": {
              "name": 1, 
              "location": 1, 
              "inspections": 1, 
              "sensors": 1, 
              "creation_date": 1
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