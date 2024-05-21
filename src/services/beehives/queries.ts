import { generateDataApiUrl, generateDataSource, generateRequestHeaders } from "@/utils/dataApi";

/**
 * Return a list of all beehive names and their ID.
 * @returns All beehives their names and IDs.
 */
export async function getAllBeehiveNamesAndIDs(): Promise<{ documents: BeehiveName[] }> {
  try {
    const response = await fetch(generateDataApiUrl("find"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("beehives"),
        "projection": {
          "_id": 1, 
          "name": 1
        }
      })
    })
    return response.json();
  } catch (error) {
    throw new Error(`Realm Data API returned an error at getAllBeehiveNamesAndIDs: ${error}`)
  }
}

export async function getBeehiveByID(beehiveID: string): Promise<{ documents: Beehive }> {
  try {
    const response = await fetch(generateDataApiUrl("findOne"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("beehives"),
        "filter": {
          "_id": {"$oid": beehiveID }
        }
      })
    })
    return response.json();
  } catch (e) {
    throw new Error(`Realm Data API returned an error: ${e}`)
  }
}

// ! --> TG deprecated, use the frame merger function.
export async function getFramesByBeehiveID(beehiveID: string): Promise<{ documents: Beehive }> {
  try {
    const response = await fetch(generateDataApiUrl("aggregate"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("beehives"),
        "pipeline": [
          {
            "$match": {
              "_id": { "oid": beehiveID }
            }
          }, {
            "$unwind": {
              "path": "$frames", 
              "preserveNullAndEmptyArrays": true
            }
          }, {
            "$set": {
              "title": "$frames.title", 
              "_id": "$frames.id"
            }
          }, {
            "$project": {
              "title": 1
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
// ! <-- TG deprecated

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
/* return object of getSummerizedBeehives.
{
  _id: '662f5e43f49b7c7d7a3adc54',
  name: 'Prime Hive',
  location: { 
    type: 'Point', 
    coordinates: [ -73.856077, 40.848447 ] 
  },
  creation_date: '2024-04-29T08:45:55.125Z',
  last_inspection: { 
    illness: null, 
    last_updated: '2024-05-12T08:13:41Z' 
  },
  last_sensor_entry: {
    timestamp: '2024-05-12T16:00:00Z',
    metadata: { sensorId: '6640a643f9e02db379c51e0f' }
  },
  draft_inspections: [
    {
      _id: '66409183f9e02db379c51e08',
      title: 'Inspection 2',
      last_updated: '2024-05-12T08:13:41Z',
      draft: true
    }
  ]
}
*/

export async function getSummerizedBeehiveByID(beehiveID: string): Promise<{ documents: SummerizedBeehive }> {
  try {
    const response = await fetch(generateDataApiUrl("aggregate"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("beehives"),
          "pipeline": [
            {
                "$match": {
                    "_id": { "$oid": beehiveID }
                }
            },
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