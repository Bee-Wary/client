import Link from 'next/link';

import { getBeehiveByID } from '@/services/server/beehives/queries';
import { Button } from "@nextui-org/react";
import { Pencil } from '@phosphor-icons/react/dist/ssr';
import style from '@/styles/inspections/inspectionsPage.module.scss';
import inputStyles from '@/styles/inputs/inputs.module.scss'

const BeehiveDetailPage = async (
    { params } :
    { params: { beehiveID: string }}
) => {
    const CurrentBeehive: Beehive = (await getBeehiveByID(params.beehiveID)).document
    return (
        <>
        <section className={inputStyles.searchAndCrud}>
            <div className={inputStyles.searchField}>
                {/* Keep field for default flex spacing. */}
            </div>
            <Link 
            href={{
                pathname: `/inspections`,
                query: { beehiveRefID: CurrentBeehive._id }
            }}>
            <Button 
                className={`${inputStyles.actionButton} p-3`}
                size="lg"
                endContent={<Pencil  weight='fill' size={64}/>}
            >
                Notes
            </Button>
        </Link>
        </section>
        
        <h2>Beehive info</h2>
        <p className='mb-2'>BeehiveDetailPage</p>
        </>
    );
}

export default BeehiveDetailPage