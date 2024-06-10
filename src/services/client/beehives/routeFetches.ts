/**
 * Fetch the beehive by the ID via the route handlers.
 * @param {string} BeehiveID - The ID of the beehive to fetch.
 * @returns The Jsonified Object response from the fetch.
 */
export async function fetchBeehiveByID(BeehiveID: string): Promise<Beehive> {
    try {  
        const response = await fetch('/api/beehives/' + BeehiveID, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ beehiveID: BeehiveID }),
        });
                
        return await response.json();
    } catch (error: any) {
        return error.message;
    }
}


export async function fetchCreateNewBeehive(createBeehive: BaseBeehive): Promise<Beehive> {
    try {  
        const response = await fetch('/api/beehives', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(createBeehive),
        });
        return await response.json();
    } catch (error: any) {
        return error.message;
    }
}

export async function fetchUpdateBeehive(beehiveID: String, beehiveBody: BaseBeehive): Promise<Beehive> {
    try {  
        const bodyContent = {
            "beehiveID": beehiveID,
            "updateInspection": beehiveBody
        }

        const response = await fetch('/api/beehives/' + beehiveID, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyContent),
        });
        return await response.json();
    } catch (error: any) {
        return error.message;
    }
}



/**
 * Delete an beehive that queries the route handler in '/api/beehive/route.ts' from the backend.
 * @param {String} beehiveID The full baseBeehive object to create.
 * @return {BaseBeehive} response - The Object response from the creation in the form of a beehive .
 */
export async function fetchDeleteBeehive(beehiveID: String): Promise<String> {
    try {          
        const response = await fetch('/api/beehives/' + beehiveID, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify( beehiveID ),
        });
        
        return await response.json();
    } catch (error:any) {
        return error.message;
    }
}
