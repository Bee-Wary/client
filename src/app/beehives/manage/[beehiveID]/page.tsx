import Link from 'next/link';

import { getBeehiveByID } from '@/services/server/beehives/queries';
import { Button } from "@nextui-org/react";
import { Pencil } from '@phosphor-icons/react/dist/ssr';
import inputStyles from '@/styles/inputs/inputs.module.scss'
import { BeehiveForm } from '@/components/beehives/BeehiveForm';

const BeehiveDetailPage = async (
    { params } :
    { params: { beehiveID: string }}
) => {

    const currentBeehive: Beehive = (await getBeehiveByID(params.beehiveID)).document
    return (
        <>
        <section className={inputStyles.searchAndCrud}>
            <div className={inputStyles.searchField}>
                {/* Keep field for default flex spacing. */}
            </div>
            <Link
                href={{
                    pathname: `/inspections`,
                    query: { beehiveRefID: currentBeehive._id }
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
        
        <BeehiveForm
            readOnly={true}
            name={currentBeehive.name}
            material={currentBeehive.material}
            location={currentBeehive.location}
            queen={currentBeehive.queen}
            frames={currentBeehive.frames}
            >

            </BeehiveForm>
        </>
    );
}

export default BeehiveDetailPage