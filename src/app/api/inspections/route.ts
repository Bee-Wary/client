import { createNewInspection } from '@/services/inspections/queries';

export async function POST(request: Request) {
    const baseFullInspectionContent: BaseFullInspection = await request.json();  
    console.log('[debug] 1', baseFullInspectionContent);
    
    
    const data: BaseFullInspection = (await createNewInspection(baseFullInspectionContent)).document;
    // console.log('[debug] inspection/route.ts data', data);
    
    return Response.json( data )
}