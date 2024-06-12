import { SensorsBuyForm } from '@/components/sensor/SensorsBuyFrom';

// Page function:
const SensorsBuyPage = () => {
    return (
        <>
            <h1 className='max-w-[1200px] mt-5 flex justify-center'>Order items:</h1>
            <SensorsBuyForm>
            </SensorsBuyForm>
        </>
    );
}

export default SensorsBuyPage;