/**
 * A collection of data formats found in the MongoDB database
 */

/**
 * The beehive data model found in the MongoDB Database
 */
interface Beehive {
    _id: string,
    name: string,
    location: GeoPoint,
    material: string,
    frames: Frame[]
    queen: Queen
    creation_date: string
}

/**
 * The Frames subdocument found in the Beehive documents
 */
interface Frame {
    id: string,
    title: string
}

/**
 * A standerdized way of saving Location coordinates, you can read more [here](https://datatracker.ietf.org/doc/html/rfc7946)
 */
interface GeoPoint {
    type: "Point",
    coordinates: [number, number]
}

type Queen = {
    creationDate: string,
    markingDescription: string,
}