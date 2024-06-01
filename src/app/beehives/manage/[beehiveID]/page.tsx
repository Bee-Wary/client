import Link from 'next/link';

import { getBeehiveByID } from '@/services/server/beehives/queries';
import { Button } from "@nextui-org/react";
import { ChartBar, Note, Pencil } from '@phosphor-icons/react/dist/ssr';
import inputStyles from '@/styles/inputs/inputs.module.scss'
import { BeehiveForm } from '@/components/beehives/BeehiveForm';

const BeehiveDetailPage = async (
    { params } :
    { params: { beehiveID: string }}
) => {

    const currentBeehive: Beehive = (await getBeehiveByID(params.beehiveID)).document
    return (
        <>
        <section className="border-b-4 p-4 flex flex-row justify-around">
            <Link
                href={{
                    pathname: `/inspections`,
                    query: { beehiveRefID: currentBeehive._id }
            }}>
                <Button 
                    className={`${inputStyles.actionButton} p-3`}
                    size="lg"
                    endContent={<Note size={32} weight="fill" />}
                >
                    Notes
                </Button>
            </Link>
            <Link
                href={{
                    pathname: `/statistics`,
                    query: { beehiveRefID: currentBeehive._id }
            }}>
                <Button 
                    className={`${inputStyles.actionButton} p-3`}
                    size="lg"
                    endContent={<ChartBar size={32} weight="fill" />}
                >
                    Statistics
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