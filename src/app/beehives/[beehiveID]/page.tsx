import Link from 'next/link';

const BeehiveDetailPage = (
    { params } :
    { params: { beehiveID: string }}
) => {
    return (
        <>
        <p className='mb-2'>BeehiveDetailPage</p>
        <Link 
            className='p-3 rounded bg-dusty-green'
            key={params.beehiveID} href={{
                pathname: `/inspections`,
                query: { beehiveRefID: params.beehiveID }
            }}>
            view inspections of this beehive
        </Link>
        </>
    );
}

export default BeehiveDetailPage