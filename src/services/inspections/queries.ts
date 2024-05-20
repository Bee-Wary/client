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

/**
 * fetches a single inspection by its ID
 * @param inspectionID - string notation of the inspection ObjectID.
 * @returns detailed inspection, frames listed.
 */
export async function getFullInspectionByID(inspectionID: string): Promise<{ document: FullInspection }> {
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
