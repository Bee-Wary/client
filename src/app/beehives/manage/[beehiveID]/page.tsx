import Link from 'next/link';

import { getBeehiveByID } from '@/services/server/beehives/queries';
import { Button } from "@nextui-org/react";
import { Pencil } from '@phosphor-icons/react/dist/ssr';
import style from '@/styles/inspections/inspectionsPage.module.scss';
import inputStyles from '@/styles/inputs/inputs.module.scss'
import HeaderButton from '@/components/HeaderButton';

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
            <HeaderButton
                href={{
                    pathname: `/inspections`,
                    query: { beehiveRefID: CurrentBeehive._id }
                }}
                icon={<Pencil weight='fill' size={64}/>}>
                    Notes
            </HeaderButton>
        </section>
        <h2>Beehive info</h2>
        <p className='mb-2'>BeehiveDetailPage</p>
        </>
    );
}

export default BeehiveDetailPage