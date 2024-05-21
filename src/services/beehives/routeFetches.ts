/**
 * Fetch the beehive by the ID via the route handlers.
 * @param {string} BeehiveID - The ID of the beehive to fetch.
 * @returns The Object response from the fetch.
 */
export async function fetchBeehiveByID(BeehiveID: string) {
    try {  
        const response = await fetch('/api/beehives', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ beehiveID: BeehiveID }),
        });

        return await response.json();
    } catch (error:any) {
        console.log(error.message);
    }
}
