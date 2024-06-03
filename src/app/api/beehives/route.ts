import { getBeehiveByID } from '@/services/server/beehives/queries';

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