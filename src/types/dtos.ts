/**
 * This files contain the transmitted objects from the data API
 * *This is mostly used when working with aggregation pipelines
 */

/**
 * The beehive data model, summerized and stripped down for the homepage to only the needed info
 */
interface SummerizedBeehives{
    _id: string;
    name: string;
    location: GeoPoint;
    illness: boolean;
    last_updated: string | null;
}