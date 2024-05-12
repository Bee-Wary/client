/**
 * This files contain the transmitted objects from the data API
 * *This is mostly used when working with aggregation pipelines
 */

/**
 * The beehive data model, summerized and stripped down for the homepage to only the needed info
 */
interface SummerizedBeehive{
    _id: string;
    name: string;
    location: GeoPoint;
    inspections?: {
        illness: string | null;
        last_updated: string;
    };
    sensors?: {
        timestamp: string;
        metadata: {
            sensorId: string;
        }
    }
    creation_date: string;
}