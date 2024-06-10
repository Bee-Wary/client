import { generateDataApiUrl, generateDataSource, generateRequestHeaders } from "@/utils/dataApi";
import { revalidatePath } from 'next/cache';

/**
 * Fetches all inspections from the database in full detail with the frames content.
 * @returns all detailed inspections, frames from beehives merged.
 */
export async function getAllFullyDetailedInspections(): Promise<{ documents: FullInspection[] }> {
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
          "title": 1,
          "description": 1,
          "frameAmount": { "$size": "$frames" },
          "illness": 1,
          "medication": 1,
          "ref_beehive": 1,
          "creation_date": 1,
          "last_updated": 1,
          "draft": 1
        },
      })
    })
    return await response.json();
  } catch ( error ) {
    throw new Error(`Realm Data API returned an error on getAllFullyDetailedInspections: ${ error }`) 
  }
}

/**
 * Fetches all inspections from a beehive from the database in full detail with the frames counted.
 * @returns all detailed inspections of a beehive, frames counted not listed.
 */
export async function getAllDetailedInspectionsByBeehiveRefIDWithFrameCount(beehiveID: string): Promise<{ documents: FullInspection[] }> {
  try {
    const response = await fetch(generateDataApiUrl("find"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("inspections"),
        "filter": {
          "ref_beehive": {
            "$oid": beehiveID
          },
        },
        "sort": {
          "draft": -1,
          "last_updated": -1
        },
        "projection": {
          "_id": 1,
          "title": 1,
          "description": 1,
          "frameAmount": { "$size": "$frames" },
          "illness": 1,
          "medication": 1,
          "ref_beehive": 1,
          "creation_date": 1,
          "last_updated": 1,
          "draft": 1
        },
      })
    })
    return await response.json();
  } catch ( error ) {
    throw new Error(`Realm Data API returned an error on getFullInspectionsOfBeehiveByBeehiveRefID: ${ error }`) 
  }
}

/**
 * Fetches all inspections from the database and summerizes them for use in the homepage
 * @returns a summerized overview of the inspections
 */
export async function getAllSummerizedInspections(): Promise<{ documents: SummerizedInspection[] }> {
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
    return await response.json();
  } catch (e) {
    throw new Error(`Realm Data API returned an error: ${e}`)
  }
}

/**
 * Fetches all inspections from the database in full detail with the frames counted.
 * @returns all detailed inspections, frames counted not listed.
 */
export async function getInspectionWithBeehiveFrameDataByInspectionID(inspectionID: string): Promise<{ documents: FullInspection[] }> {
  try {
    const response = await fetch(generateDataApiUrl("aggregate"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("inspections"),
      pipeline: [
        {
          $match: {
            _id: { $oid: inspectionID }
          }
        },
        {
          $lookup: {
            from: "beehives",
            localField: "ref_beehive",
            foreignField: "_id",
            as: "beehiveframes",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  frames: 1
                }
              }
            ]
          }
        },
        {
          $unwind: {
            path: "$beehiveframes",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            beehiveframes: "$beehiveframes.frames"
          }
        },
        {
          $addFields: {
            frames: {
              $map: {
                input: "$frames",
                as: "frame",
                in: {
                  $mergeObjects: [
                    "$$frame",
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$beehiveframes",
                            as: "beeframe",
                            cond: {
                              $eq: [
                                "$$frame.ref_frame",
                                "$$beeframe.id"
                              ]
                            }
                          }
                        },
                        0
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        {
          $unset: ["beehiveframes"]
        }
      ]
      })
    }) 
    return await response.json();
  } catch ( error ) {
    throw new Error(`Realm Data API returned an error on getAllFullyDetailedInspections: ${ error }`) 
  }
}

/**
 * create a single new inspection.
 * @returns the added inspection from the database.
 */
export async function createNewInspection(
  {title, description, frames, illness, medication, ref_beehive, creation_date, last_updated, draft} : BaseFullInspection
): Promise<{ document: BaseFullInspection }> {
  try {
    const _documentContent: any = {
      "title": title,
      "description": description,
      "frames": 
        frames.map(frame => (
        {
          "queen_present": frame.queen_present,
          "brood_percentage": frame.brood_percentage,
          "pollen_percentage": frame.pollen_percentage,
          "honey_percentage": frame.honey_percentage,
          "ref_frame": { "$oid": frame.id }
        }
        )),
      "illness": illness,
      "medication": medication,
      "creation_date": {
        "$date": creation_date
      },
      "last_updated": {
        "$date": last_updated
      },
      "draft": draft,
    }

    if (ref_beehive) {
      _documentContent.ref_beehive = { "$oid": ref_beehive };
    }    

    const response = await fetch(generateDataApiUrl("insertOne"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("inspections"),
        "document": {
          ..._documentContent
        }
      })
    })
    revalidatePath("/inspections")
    return await response.json();
    
  } catch ( error ) {  
    throw new Error(`Realm Data API returned an error on createNewInspection: ${ error }`) 
  }
}

/**
 * update a single inspection.
 * @returns the added inspection from the database.
 */
export async function UpdateInspectionByInspectionID(
  inspectionID : String, 
  {title, description, frames, illness, medication, ref_beehive, creation_date, last_updated, draft} : BaseFullInspection
): Promise<{ document: BaseFullInspection }> {
  try {
    const _documentContent: any = {
      "title": title,
      "description": description,
      "frames": 
        frames.map(frame => (
        {
          "queen_present": frame.queen_present,
          "brood_percentage": frame.brood_percentage,
          "pollen_percentage": frame.pollen_percentage,
          "honey_percentage": frame.honey_percentage,
          "ref_frame": { "$oid": frame.id }
        }
        )),
      "illness": illness,
      "medication": medication,
      "creation_date": {
        "$date": creation_date
      },
      "last_updated": {
        "$date": last_updated
      },
      "draft": draft,
    }

    if (ref_beehive) {
      _documentContent.ref_beehive = { "$oid": ref_beehive };
    }

    const response = await fetch(generateDataApiUrl("updateOne"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("inspections"),
        filter: {
          _id: { "$oid": inspectionID }
        },
        update: {
          "$set": {
            ..._documentContent
          }
        },
        upsert: false
      })
    })
    revalidatePath("/inspections")
    revalidatePath(`/inspections/manage/${inspectionID}`)
    return await response.json();
    
  } catch ( error ) {
    throw new Error(`Realm Data API returned an error on createNewInspection: ${ error }`) 
  }
}

/**
 * Delete a single inspection.
 * @returns the amount deleted items from the database.
 */
export async function DeleteInspectionByInspectionID(
  inspectionID : String, 
): Promise<{ document: string }> {
  try {    
    const response = await fetch(generateDataApiUrl("deleteOne"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("inspections"),
        filter: {
          _id: { "$oid": inspectionID }
        }
      })
    })
    revalidatePath("/inspections")
    return await response.json();
    
  } catch ( error ) {
    throw new Error(`Realm Data API returned an error on DeleteInspectionByInspectionID: ${ error }`) 
  }
}
