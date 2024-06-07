import { createBeehive } from '@/services/server/beehives/queries';

/**
 * Get a beehive by ID, this is with the frame Title NOT frame content.
 * @param request a request with the body containing the beehiveID.
 * @returns Response of the found beehive.
 */
export async function POST(request: Request): Promise<Response> {
    const beehive = await request.json();
    const response = (await createBeehive(beehive));
    return Response.json( response )
}