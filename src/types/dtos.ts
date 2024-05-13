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
    last_inspection?: {
        illness: string | null;
        last_updated: string;
    };
    last_sensor_entry?: {
        timestamp: string;
        metadata: {
            sensorId: string;
        }
    },
    draft_inspections?: {
        _id: string;
        title: string;
        last_updated: string;
        draft: boolean;
    }[]
    creation_date: string;
}

/**
 * The inspection data model, summerized and stripped down for the homepage to only the needed info
 */
interface SummerizedInspection{
    _id: string;
    title: string;
    description: string;
    ref_beehive: string;
    last_updated: string;
    draft: boolean;
}