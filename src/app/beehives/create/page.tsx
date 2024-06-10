import { BeehiveForm } from '@/components/beehives/BeehiveForm';

const BeehiveCreatePage = () => {

    return (
        <>
            <h2 className='px-8 mt-4'>Create new beehive</h2>
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