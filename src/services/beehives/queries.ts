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
              "as": "last_inspection", 
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
              "as": "draft_inspections", 
              "from": "inspections", 
              "foreignField": "ref_beehive", 
              "localField": "_id", 
              "pipeline": [
                {
                  "$match": {
                    "draft": true
                  }
                }, {
                  "$sort": {
                    "last_updated": -1
                  }
                }, {
                  "$limit": 1
                }, {
                  "$project": {
                    "_id": 1, 
                    "title": 1, 
                    "last_updated": 1, 
                    "draft": 1
                  }
                }
              ]
            }
          }, {
            "$lookup": {
              "from": "sensors", 
              "localField": "sensor_ref", 
              "foreignField": "metadata.sensorId", 
              "as": "last_sensor_entry", 
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
              "path": "$last_inspection", 
              "preserveNullAndEmptyArrays": true
            }
          }, {
            "$unwind": {
              "path": "$last_sensor_entry", 
              "preserveNullAndEmptyArrays": true
            }
          }, {
            "$project": {
              "name": 1, 
              "location": 1, 
              "last_inspection": 1, 
              "last_sensor_entry": 1, 
              "draft_inspections": {
                "$cond": {
                  "if": {
                    "$ne": [
                      "$draft_inspections", []
                    ]
                  }, 
                  "then": "$draft_inspections", 
                  "else": "$$REMOVE"
                }
              }, 
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