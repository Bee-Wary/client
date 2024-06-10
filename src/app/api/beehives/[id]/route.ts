import { getBeehiveByID, DeleteBeehiveByBeehiveID, updateBeehiveByBeehiveID } from '@/services/server/beehives/queries';

/**
 * Get a beehive by ID, this is with the frame Title NOT frame content.
 * @param request a request with the body containing the beehiveID.
 * @returns Response of the found beehive.
 */
export async function POST(request: Request): Promise<Response> {
    const beehiveID = (await request.json()).beehiveID
    const response: Beehive = (await getBeehiveByID(beehiveID)).document;
    return Response.json( response )
}

/**
 * update a beehive in the database.
 * @param request A JSON stringified Objecct of a beehive
 * @returns The the updated beehive with _id.
 */
export async function PATCH(request: Request): Promise<Response> {
    const _beehiveContent = await request.json();
    const _InspectionID: String = _beehiveContent.beehiveID;
    const _beehiveBody: Beehive = _beehiveContent.updateInspection;  
    
    
    const updatedID = (await updateBeehiveByBeehiveID(_InspectionID, _beehiveBody));
    
    return Response.json(updatedID)
}

/**
 * Post a new BaseFullInspection to the database.
 * @param request A JSON stringified inspectionID of string
 * @returns The the created Fullinspection with _id.
 */
export async function DELETE(request: Request): Promise<Response> {
    const _InspectionID = await request.json();
    const insertedID = (await DeleteBeehiveByBeehiveID(_InspectionID));
    
    return Response.json(insertedID)
}