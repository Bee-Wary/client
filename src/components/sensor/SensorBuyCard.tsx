'use client';

import Image from "next/image";
import { IconProps } from "@phosphor-icons/react";
import { BadgeIndicatorRow } from '@/components/shared/indicators/badgeIndicatorRow';
import { BadgeIndicator } from '@/components/shared/indicators/badgeIndicator';
import sensorBuyStyles from "@/styles/sensors/sensorBuy.module.scss";

type Props = {
    badgeContent: React.ReactElement<IconProps> | React.ReactNode | string;
    image: string;

    title: string;
    infoContent: {
        icon: React.ReactElement<IconProps> | React.ReactNode | string;
        title: string
        description: string;
    }[];
    children?: React.ReactNode;
    infoTexts?: string[];
    importantTexts?: string[];
}

export const SensorBuyCard = (props: Props) => {

    return (
        <article className={sensorBuyStyles.sensorBuyCard}>
            <div className={sensorBuyStyles.topContent}>
                <div>
                    <Image src={"/images/" + props.image + ".jpg"} width={400} height={400} alt={`Image of ${props.image}`} />
                </div>
                <div>
                    <div className={sensorBuyStyles.headingContainer}>
                        <h3>{props.title}</h3>
                        <BadgeIndicatorRow>
                            <BadgeIndicator
                            >
                                {props.badgeContent}
                            </BadgeIndicator>
                        </BadgeIndicatorRow>
                    </div>
                    {props.infoContent.map((info, index) => (
                        <div key={index} className={sensorBuyStyles.infoRow}>
                            {info.icon}
                            <h4>{info.title}</h4>
                            <p>{info.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* The content in between, mostly an input field. */}
            <div className={sensorBuyStyles.infoBlock}>
                {props.children}
            </div>
            {/* Information text (if applicable). */}
            {props.infoTexts?.length ?? 0 > 0
                ? <div className={sensorBuyStyles.infoBlock}>
                    <h3>Info:</h3>
                    {props.infoTexts!.map(
                        (infoText, index) =>
                            <p key={index}>
                                {infoText}
                            </p>
                    )}
                </div>
                : null
            }
            {/* Detail/important to mention texts (if applicable). */}
            {props.importantTexts?.length ?? 0 > 0
                ? <div className={sensorBuyStyles.infoBlock}>
                    <h3>Important:</h3>
                    <ul>
                        {props.importantTexts!.map(
                            (infoText, index) =>
                                <li key={index}>
                                    {infoText}
                                </li>
                        )}
                    </ul>
                </div>
                : null
            }
        </article>
    )

};

export default SensorBuyCard;