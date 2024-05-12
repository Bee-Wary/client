/**
 * A collection of data formats found in the MongoDB database
 */

/**
 * The beehive data model found in the MongoDB Database
 */
interface Beehive {
    _id: string,
    name: string,
    location: {
        type: "Point",
        coordinates: [number, number]
    },
    material: string,
    frames: Frame[]
}

/**
 * The Frames subdocument found in the Beehive documents
 */
interface Frame {
    "id": string,
    "title": string
}