import { generateDataApiUrl, generateDataSource, generateRequestHeaders } from '@/utils/dataApi';
/**
 * Return a list of all unique sensor types.
 * @returns {Promise<{StatisticsList[]}>} All unique sensor types with their metadata.
 */
export async function getAllStatistics(): Promise<{ documents: StatisticsList[] }> {
  try {
    const response = await fetch(generateDataApiUrl('find'), {
      method: 'POST',
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource('sensors'),
        projection: {
          _id: 1,
          value: 1,
          metadata: {
            type: 1,
            unit: 1,
          },
        },
      }),
    });

    const { documents } = await response.json();

    // Use a Set to track seen sensor types
    const seenTypes = new Set();
    const uniqueSensors: any[] = [];

    documents.forEach((document: { metadata: { type: any } }) => {
      const sensorType = document.metadata.type;
      if (!seenTypes.has(sensorType)) {
        seenTypes.add(sensorType);
        uniqueSensors.push(document);
      }
    });

    return { documents: uniqueSensors };
  } catch (error) {
    throw new Error(`Realm Data API returned an error at getAllStatistics: ${error}`);
  }
}
