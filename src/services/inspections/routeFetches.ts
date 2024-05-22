/**
 * Create a new inspection
 * @param {BaseFullInspection} createInspection - The full baseinspection object to create.
 * @returns The Object response from the creation.
 */
export async function fetchCreateNewInspection(createInspection: BaseFullInspection) {
    console.log('[debug]fetchCreateNewInspection 1', JSON.stringify( createInspection ));
    
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
        console.log(error.message);
    }
}
