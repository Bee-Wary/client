/**
 * Create a new inspection that queries the route handler in '/api/inspections/route.ts' from the backend.
 * @param {BaseFullInspection} createInspection The full baseFullInspection object to create.
 * @return {FullInspection} response - The Object response from the creation in the form of a FullInspection .
 */
export async function fetchCreateNewInspection(createInspection: BaseFullInspection): Promise<FullInspection> {
    try {  
        const response = await fetch('/api/inspections', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify( createInspection ),
        });
        
        return await response.json();
    } catch (error:any) {
        return error.message;
    }
}

/**
 * Create a new inspection that queries the route handler in '/api/inspections/route.ts' from the backend.
 * @param {String} inspectionID The inspectionID to update.
 * @param {BaseFullInspection} inspectionBody The full baseFullInspection object to update.
 * @return {FullInspection} response - The Object response from the creation in the form of a FullInspection .
 */
export async function fetchUpdateInspection(inspectionID: String, inspectionBody: BaseFullInspection): Promise<FullInspection> {
    try {  
        const bodyContent = {
            "inspectionID": inspectionID,
            "createInspection": inspectionBody
        }
        
        const response = await fetch('/api/inspections', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify( bodyContent ),
        });
        
        return await response.json();
    } catch (error:any) {
        return error.message;
    }
}

/**
 * Delete an inspection that queries the route handler in '/api/inspections/route.ts' from the backend.
 * @param {String} inspectionID The full baseFullInspection object to create.
 * @return {FullInspection} response - The Object response from the creation in the form of a FullInspection .
 */
export async function fetchDeleteInspection(inspectionID: String): Promise<String> {
    try {          
        const response = await fetch('/api/inspections', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify( inspectionID ),
        });
        
        return await response.json();
    } catch (error:any) {
        return error.message;
    }
}

