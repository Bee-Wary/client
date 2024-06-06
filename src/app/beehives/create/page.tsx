import { ReactNode } from 'react';

import { BeehiveForm } from '@/components/beehives/BeehiveForm';
import inputStyles from '@/styles/inputs/inputs.module.scss'

const BeehiveCreatePage = () => {

    return (
        <>
            <h2>Create new beehive</h2>
            <section>
                <BeehiveForm
                    readOnly={false}
                >
                </BeehiveForm>
            </section>
        </>
    );
}

export default BeehiveCreatePage