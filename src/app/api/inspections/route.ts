import { createNewInspection, UpdateInspectionByInspectionID } from '@/services/server/inspections/queries';

/**
 * catches any API route resuest with the correct handler and signature parameters.
 * the incomming pre-cast request is passed to queries in its corresopong 'services/??/queries.ts' file.
 */

/**
 * Post a new BaseFullInspection to the database.
 * @param request A JSON stringified Objecct of a BaseFullInspection
 * @returns The the created Fullinspection with _id.
 */
export async function POST(request: Request): Promise<Response> {
    const baseFullInspectionContent: BaseFullInspection = await request.json();  
    
    const insertedID = (await createNewInspection(baseFullInspectionContent));
    
    return Response.json( insertedID )
}

/**
 * Post a new BaseFullInspection to the database.
 * @param request A JSON stringified Objecct of a BaseFullInspection
 * @returns The the created Fullinspection with _id.
 */
export async function PATCH(request: Request): Promise<Response> {
    const _InspectionContent = await request.json();
    const _InspectionID: String = _InspectionContent.inspectionID;
    const _InspectionBody: BaseFullInspection = _InspectionContent.createInspection;  
    
    
    const insertedID = (await UpdateInspectionByInspectionID(_InspectionID, _InspectionBody));
    
    return Response.json(insertedID)
}