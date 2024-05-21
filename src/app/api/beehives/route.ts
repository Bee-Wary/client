import { getBeehiveByID } from '@/services/beehives/queries';

export async function POST(request: Request) {
    const beehiveID = (await request.json()).beehiveID
    const data: Beehive = (await getBeehiveByID(beehiveID)).document;
    // console.log('[debug]', await Response.json( data ).json());
    return Response.json( data )
}