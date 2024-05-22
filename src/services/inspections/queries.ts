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

/**
 * Fetches all inspections from the database in full detail with the frames counted.
 * @returns all detailed inspections, frames counted not listed.
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
    return response.json();
  } catch ( error ) {
    throw new Error(`Realm Data API returned an error on getAllFullyDetailedInspections: ${ error }`) 
  }
}

/**
 * Fetches all inspections from a beehive from the database in full detail with the frames counted.
 * @returns all detailed inspections of a beehive, frames counted not listed.
 */
export async function getAllFullyDetailedInspectionsByBeehiveRefID(beehiveID: string): Promise<{ documents: FullInspection[] }> {
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
    return response.json();
  } catch ( error ) {
    throw new Error(`Realm Data API returned an error on getFullInspectionsOfBeehiveByBeehiveRefID: ${ error }`) 
  }
}

export async function getMergedInspectionByBeehiveRefID(beehiveRefID: string): Promise<{ documents: FullInspection[] }> {
  try {
    const response = await fetch(generateDataApiUrl("aggregate"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("inspections"),
        "pipeline": [
          {
            '$match': {
              'ref_beehive': { "$oid": beehiveRefID }
            }
          }, {
            '$lookup': {
              'as': 'frameIDs', 
              'from': 'beehives', 
              'localField': 'ref_beehive', 
              'foreignField': '_id', 
              'pipeline': [
                {
                  '$project': {
                    '_id': 0, 
                    'frames.id': 1, 
                    'frames.title': 1
                  }
                }
              ]
            }
          }, {
            '$unwind': {
              'path': '$frameIDs', 
              'preserveNullAndEmptyArrays': true
            }
          }
        ]
      })
    })
    return response.json();
  } catch ( error ) {
    throw new Error(`Realm Data API returned an error on getInspectionByBeehiveID: ${ error }`) 
  }
}



/**
 * fetches a single inspection by its ID
 * @param inspectionID - string notation of the inspection ObjectID.
 * @returns detailed inspection, frames listed.
 */
export async function getFullInspectionByID(inspectionID: string): Promise<{ documents: FullInspection }> {
  try {
    const response = await fetch(generateDataApiUrl("findOne"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("inspections"),
        "filter": {
          "_id": {
            "$oid": inspectionID
          },
        },
        "projection": {
          "_id": 1,
          "title": 1,
          "description": 1,
          "frames": 1,
          "illness": 1,
          "medication": 1,
          "ref_beehive": 1,
          "creation_date": 1,
          "last_updated": 1,
          "draft": 1
        },
      })
    })
    return response.json();
  } catch ( error ) {
    throw new Error(`Realm Data API returned an error on getFullInspectionsOfBeehiveByBeehiveRefID: ${ error }`) 
  }
}

/**
 * create a single new inspection.
 * @returns the added inspection from the database.
 */
export async function createNewInspection(
  {title, description, frames, illness, medication, ref_beehive, creation_date, last_updated, draft} : BaseFullInspection
): Promise<{ document: BaseFullInspection }> {
  // console.log('[debug] createNewInspection ', title, description, frames, illness, medication, ref_beehive, creation_date, last_updated, draft);

  try {
    const response = await fetch(generateDataApiUrl("insertOne"), {
      method: "POST",
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource("inspections"),
        "document": {
          "title": title,
          "description": description,
          "frames": [
            frames.map(frame => (
            {
              "queen_present": frame.queen_present,
              "brood_percentage": frame.brood_percentage,
              "pollen_percentage": frame.pollen_percentage,
              "honey_percentage": frame.honey_percentage,
              "ref_frame": { "$oid": frame.id }
            }
            ))
          ],
          "illness": illness,
          "medication": medication,
          "ref_beehive": {
            "$oid": ref_beehive
          },
          "creation_date": {
            "$date": creation_date
          },
          "last_updated": {
            "$date": last_updated
          },
          "draft": draft,
        }
      })
    })
    console.log('[debug] response createNewInspection ', await response.json());
    
    return await response.json();
  } catch ( error ) {
    throw new Error(`Realm Data API returned an error on createNewInspection: ${ error }`) 
  }
}

