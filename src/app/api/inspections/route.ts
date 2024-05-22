import { createNewInspection } from '@/services/inspections/queries';

/**
 * catches any API route resuest with the correct handler and signature parameters.
 * the incomming pre-cast request is passed to queries in its corresopong 'services/??/queries.ts' file.
 */

/**
 * Post a new BaseFullInspection to the database.
 * @param request A JSON stringified Objecct of a BaseFullInspection
 * @returns The resulting request header of JSON data.
 */
export async function POST(request: Request) {
    const baseFullInspectionContent: BaseFullInspection = await request.json();  
    console.log('[debug] 1', baseFullInspectionContent);
    
    
    const data: BaseFullInspection = (await createNewInspection(baseFullInspectionContent)).document;
    // console.log('[debug] inspection/route.ts data', data);
    
    return Response.json( data )
}