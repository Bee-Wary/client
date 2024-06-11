import sensorBuyStyle from '@/styles/sensors/sensorBuy.module.scss';

type Props = {
    title?: string;
    infoTexts?: string[];
    children: React.ReactNode;
}

export const SensorBuyContainer = (props: Props) => {

    return (
        <section className={sensorBuyStyle.container}>
            {props.title
                ? <h2>{props.title}</h2>
                : null
            }
            {props.infoTexts?.length ?? 0 > 0
                ? props.infoTexts!.map(
                    (infoText, index) =>
                        <p key={index}>
                            {infoText}
                        </p>
                )
                : null
            }
            {props.children}
        </section>
    )

};

export default SensorBuyContainer;