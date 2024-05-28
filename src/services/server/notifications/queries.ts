import { generateDataApiUrl, generateDataSource, generateRequestHeaders } from '@/utils/dataApi';
/**
 * Return a list of all notifications
 * @returns {Promise<{NotificationList[]}>}
 */
export async function getAllNotifications(): Promise<{ documents: NotificationList[] }> {
  try {
    const response = await fetch(generateDataApiUrl('find'), {
      method: 'POST',
      headers: generateRequestHeaders(),
      body: JSON.stringify({
        ...generateDataSource('notifications'),
        projection: {
          _id: 1,
          Name: 1,
          Message: 1,
          DateOfCreation: 1,
        },
      }),
    });
    return await response.json();
  } catch (error) {
    throw new Error(`Realm Data API returned an error at getAllNotifications: ${error}`);
  }
}
