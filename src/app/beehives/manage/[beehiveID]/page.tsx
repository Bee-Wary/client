import Link from 'next/link';

import { getBeehiveByID } from '@/services/server/beehives/queries';
import { Button } from "@nextui-org/react";
import { ChartBar, Note, Pencil } from '@phosphor-icons/react/dist/ssr';
import inputStyles from '@/styles/inputs/inputs.module.scss'
import HeaderButton from '@/components/HeaderButton';
import { BeehiveForm } from '@/components/beehives/BeehiveForm';

const BeehiveManagePage = async (
    { params }:
        { params: { beehiveID: string } }
) => {

    const currentBeehive: Beehive = (await getBeehiveByID(params.beehiveID)).document
    return (
        <>
            <section className={inputStyles.searchAndCrud}>
                <HeaderButton
                    href={{
                        pathname: `/statistics`,
                        query: { beehiveRefID: currentBeehive._id }
                    }}
                    icon={<ChartBar size={32} weight="fill" />}>
                    Statistics
                </HeaderButton>
                <HeaderButton
                    href={{
                        pathname: `/inspections`,
                        query: { beehiveRefID: currentBeehive._id }
                    }}
                    icon={<Note size={32} weight="fill" />}>
                    Notes
                </HeaderButton>
            </section>
            <BeehiveForm
                readOnly={true}
                beehive={currentBeehive}
            >
            </BeehiveForm>
        </>
    );
}

export default BeehiveManagePage
