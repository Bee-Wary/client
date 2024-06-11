'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Input } from "@nextui-org/react";
import { Broadcast, CellTower, WifiHigh, CurrencyEur } from '@phosphor-icons/react/dist/ssr';
import { SensorBuyCard } from '@/components/sensor/SensorBuyCard';
import { SensorBuyContainer } from '@/components/sensor/SensorBuyContainer';

type Props = {

}

export const SensorsBuyForm = (props: Props) => {
    const router = useRouter();
    const [lowRangeAmount, setLowRangeAmount] = useState(0);
    const [highRangeAmount, setHighRangeAmount] = useState(0);

    return (
        <>
            <SensorBuyContainer
                title="Module minicomputer"
                infoTexts={[
                    "Een minicomputer is het “brein” van de sensor module. Deze kan de data dat wordt uitgemeten ontcijferen en versturen dat u die kan bekijken op de applicatie.De computer doet zelf geen metingen, maar is een nodig element voor aansturen van de sensors.",
                    "U heeft minstens één van de volgende minicomputers nodig, aangepast aan uw noden."
                ]}
            >
                <SensorBuyCard
                    badgeContent={<Broadcast size={32} weight="fill" />}
                    image='raspberryPico'
                    title='Low-range sensor'
                    infoContent={
                        [
                            {
                                icon: <CellTower size={24} />,
                                title: 'Bereik',
                                description: '± 20 meter'
                            },
                            {
                                icon: <WifiHigh size={24} />,
                                title: 'Verbinding type',
                                description: 'Prive Wifi netwerk'
                            },
                            {
                                icon: <CurrencyEur size={24} />,
                                title: 'prijs',
                                description: '€ 5.55'
                            }
                        ]
                    }
                    infoTexts={[
                        "Een low-range of “kort bereik” sensor module is bedoeld voor bijenkasten die zich bevinden binnen het bereik van een privé wifi signaal."
                    ]}
                    importantTexts={[
                        "Als de bijenkast zich niet binnen uw wifi signaal bevind moet u een High-range sensor module aankopen.",
                        "Als u geen stroomtoevoer heeft moet u een zonnepaneel bijvoegen."
                    ]}
                >
                    <Input
                        type="number"
                        label="Low-range aantal"
                        labelPlacement='outside'
                        value={String(lowRangeAmount)}
                        onValueChange={(value) => setLowRangeAmount(Number(value))}
                        min={0}
                        classNames={{
                            inputWrapper: ['bg-petal-white-bright']
                        }}
                    />
                </SensorBuyCard>
                {/* <SensorBuyCard
                    badgeContent={<Broadcast size={32} weight="fill" />}
                    image='arduino'
                >
                </SensorBuyCard> */}
            </SensorBuyContainer >

        </>
    )

};

export default SensorsBuyForm;