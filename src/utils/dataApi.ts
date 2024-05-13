/**
 * Helper function for generate headers, links and partial body structures for calls to the Data API
 */

/**
 * Generates the required body parameters to define the database and chosen collection
 * @param collection The collection you want to target
 * @returns Object with "collection", "database" and "dataSource" keys
 */
export function generateDataSource(collection: string) {
    return {
        "collection": collection,
        "database": "app",
        "dataSource": "beewary-dev"
    }
}

/**
 * Generates the required headers needed for a Data API requests
 * ! Make sure the `REALM_API_KEY` envoiremental variable is set, otherwise this will not work
 * @returns Authorization & Content headers
 */
export function generateRequestHeaders() {
    if (!process.env.REALM_API_KEY) {
        throw new Error("The REALM_API_KEY is not set, cannot generate authorization headers")
    }
    return {
        "Content-Type": "application/json",
        "apiKey": process.env.REALM_API_KEY as string
    }
}

export function generateDataApiUrl(action: "findOne" | "find" | "insertOne" | "insertMany" | "updateOne" | "updateMany" | "deleteOne" | "deleteMany" | "aggregate") {
    return `${process.env.REALM_HOST}/app/${process.env.REALM_APP_ID}/endpoint/data/v1/action/${action}`
}