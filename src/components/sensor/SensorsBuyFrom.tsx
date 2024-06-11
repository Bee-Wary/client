/* eslint-disable react/jsx-key */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Input, Button } from "@nextui-org/react";
import { Broadcast, CellTower, WifiHigh, CurrencyEur, Lightning, ChartLine, Thermometer, Microphone, Barbell, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { SensorBuyCard } from '@/components/sensor/SensorBuyCard';
import { SensorBuyContainer } from '@/components/sensor/SensorBuyContainer';
import { useChoiceModal } from '@/utils/hooks/useChoiceModal';
import inputStyles from '@/styles/inputs/inputs.module.scss'

type Props = {

}

export const SensorsBuyForm = (props: Props) => {
    const router = useRouter();
    const { showChoiceModal, ModalComponent } = useChoiceModal();
    const [lowRangeAmount, setLowRangeAmount] = useState(0);
    const [highRangeAmount, setHighRangeAmount] = useState(0);
    const [solarpanelAmount, setSolarpanelAmount] = useState(0);
    const [temperatureSensorAmount, setTemperatureSensorAmount] = useState(0);
    const [microphoneSensorAmount, setMicrophoneSensorAmount] = useState(0);
    const [weightSensorAmount, setWeightSensorAmount] = useState(0);

    return (
        <>
            <form
                className='mb-[104px]'
                onSubmit={(event) => HandeleSumbmitAndSave(event)}
            >
                <SensorBuyContainer
                    title="Module minicomputer"
                    infoTexts={[
                        "A minicomputer is the “brain” of a sensor module. It can read out the data of sensor, and send and translate it so it can be seen on the application. The computer itself does not perform any measurements, but it is a needed element do control the sensors.",
                        "U need at least one of the following, based on your needs. "
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
                                    title: 'Reach',
                                    description: '± 20 meter'
                                },
                                {
                                    icon: <WifiHigh size={24} />,
                                    title: 'Connection type',
                                    description: 'Private Wifi network'
                                },
                                {
                                    icon: <CurrencyEur size={24} />,
                                    title: 'Price',
                                    description: '€ 5.55'
                                }
                            ]
                        }
                        infoTexts={[
                            "A Low-range sensor module is meant for beehives that are located within reach of a private Wi-Fi signal."
                        ]}
                        importantTexts={[
                            "If a beehive is not within your Wi-Fi signal reach, you have to buy a High-range sensor module.",
                            "If there is no local power supply, you must add  a solar panel. "
                        ]}
                    >
                        <Input
                            type="number"
                            label="Low-range amount"
                            labelPlacement='outside'
                            value={String(lowRangeAmount)}
                            onValueChange={(value) => setLowRangeAmount(Number(value))}
                            min={0}
                            classNames={{
                                inputWrapper: ['bg-petal-white-bright']
                            }}
                        />
                    </SensorBuyCard>
                    <SensorBuyCard
                        badgeContent={<Broadcast size={32} weight="fill" />}
                        image='arduino'
                        title='High-range sensor'
                        infoContent={
                            [
                                {
                                    icon: <CellTower size={24} />,
                                    title: 'Reach',
                                    description: '± 10 kilometer'
                                },
                                {
                                    icon: <WifiHigh size={24} />,
                                    title: 'Connection type',
                                    description: 'Public network'
                                },
                                {
                                    icon: <CurrencyEur size={24} />,
                                    title: 'Price',
                                    description: '€ 5.55'
                                }
                            ]
                        }
                        infoTexts={[
                            "A High-range sensor module is for beehives that are located far from a private Wi-Fi or internet signal."
                        ]}
                        importantTexts={[
                            "If there is no local power supply, you must add a solar panel.",
                        ]}
                    >
                        <Input
                            type="number"
                            label="High-range amount"
                            labelPlacement='outside'
                            value={String(highRangeAmount)}
                            onValueChange={(value) => setHighRangeAmount(Number(value))}
                            min={0}
                            classNames={{
                                inputWrapper: ['bg-petal-white-bright']
                            }}
                        />
                    </SensorBuyCard>
                </SensorBuyContainer >
                <SensorBuyContainer
                    title="Module provisions"
                    infoTexts={[
                        "Based on the location of your to be supplied beehive location, a sensor module might need extra provisions.",
                        "You might need one of the following, based on your needs. "
                    ]}
                >
                    <SensorBuyCard
                        badgeContent={<Lightning size={32} weight="fill" />}
                        image='SolarPanel'
                        title='Solar panel'
                        infoContent={
                            [
                                {
                                    icon: <Lightning size={24} />,
                                    title: 'watts',
                                    description: '10w - 12W'
                                },
                                {
                                    icon: <CurrencyEur size={24} />,
                                    title: 'Price',
                                    description: '€ 13.84'
                                }
                            ]
                        }
                        infoTexts={[
                            "A solar panel can supply a sensor module with power. One solar panel is enough for one sensor module."
                        ]}
                        importantTexts={[
                            "Place the solar panel in a well-lit location around the beehive.",
                        ]}
                    >
                        <Input
                            type="number"
                            label="Solar panel amount"
                            labelPlacement='outside'
                            value={String(solarpanelAmount)}
                            onValueChange={(value) => setSolarpanelAmount(Number(value))}
                            min={0}
                            classNames={{
                                inputWrapper: ['bg-petal-white-bright']
                            }}
                        />
                    </SensorBuyCard>
                </SensorBuyContainer >
                <SensorBuyContainer
                    title="Sensors"
                    infoTexts={[
                        "A sensor can perform a specific measurement and pass it on to the connected minicomputer module.",
                        "Each minicomputer module needs at least one sensor to perform measurements.."
                    ]}
                >
                    <SensorBuyCard
                        badgeContent={<Thermometer size={32} weight="fill" />}
                        image='temperatureSensor'
                        title='Temperature sensor'
                        infoContent={
                            [
                                {
                                    icon: <ChartLine size={24} />,
                                    title: 'Measurement type',
                                    description: 'Temperature / Humidity'
                                },
                                {
                                    icon: <CurrencyEur size={24} />,
                                    title: 'Price',
                                    description: '€ 9.21'
                                }
                            ]
                        }
                        infoTexts={[
                            "A temperature sensor can be used to measure the temperature inside a beehive.Multiple temperature sensors in one beehive are possible and can increase the accuracy of the measurements.",
                            "The sensor can also measure the humidity in the beehive."
                        ]}
                        importantTexts={[
                            "Heat goes up; be aware of which location you place the sensor.",
                            "The readings of humidity and temperature of one single sensor can differ per desired location."
                        ]}
                    >
                        <Input
                            type="number"
                            label="Temperature sensor amount"
                            labelPlacement='outside'
                            value={String(temperatureSensorAmount)}
                            onValueChange={(value) => setTemperatureSensorAmount(Number(value))}
                            min={0}
                            classNames={{
                                inputWrapper: ['bg-petal-white-bright']
                            }}
                        />
                    </SensorBuyCard>
                    <SensorBuyCard
                        badgeContent={<Microphone size={32} weight="fill" />}
                        image='microphoneSensor'
                        title='Microphone sensor'
                        infoContent={
                            [
                                {
                                    icon: <ChartLine size={24} />,
                                    title: 'Measurement type',
                                    description: 'Sound'
                                },
                                {
                                    icon: <CurrencyEur size={24} />,
                                    title: 'Price',
                                    description: '€ 6.43'
                                }
                            ]
                        }
                        infoTexts={[
                            "A microphone sensor can measure the sound in and around a beehive. This tracks how “lively” the beehive is."
                        ]}
                        importantTexts={[
                            "You can position this sensor inside and outside the beehive. Based on the desired result.",
                        ]}
                    >
                        <Input
                            type="number"
                            label="Microphone sensor amount"
                            labelPlacement='outside'
                            value={String(microphoneSensorAmount)}
                            onValueChange={(value) => setMicrophoneSensorAmount(Number(value))}
                            min={0}
                            classNames={{
                                inputWrapper: ['bg-petal-white-bright']
                            }}
                        />
                    </SensorBuyCard>
                    <SensorBuyCard
                        badgeContent={<Barbell size={32} weight="fill" />}
                        image='weightSensor'
                        title='Weight sensor'
                        infoContent={
                            [
                                {
                                    icon: <ChartLine size={24} />,
                                    title: 'Measurement type',
                                    description: 'Weight'
                                },
                                {
                                    icon: <CurrencyEur size={24} />,
                                    title: 'Price',
                                    description: '€ 7.32'
                                }
                            ]
                        }
                        infoTexts={[
                            "A weight sensor can measure the weight of a beehive. this gives and indication how full the beehive is."
                        ]}
                        importantTexts={[
                            "One single weight sensor measures up to 20KG. You probably need to install multiple weight sensors at once, for instance, 4 at the base to measure up to 80KG.",
                        ]}
                    >
                        <Input
                            type="number"
                            label="Weight sensor amount"
                            labelPlacement='outside'
                            value={String(weightSensorAmount)}
                            onValueChange={(value) => setWeightSensorAmount(Number(value))}
                            min={0}
                            classNames={{
                                inputWrapper: ['bg-petal-white-bright']
                            }}
                        />
                    </SensorBuyCard>
                </SensorBuyContainer >
                <Button
                    type="submit"
                    className={inputStyles.saveButton}
                    startContent={<CheckCircle weight='fill' size={72} />}
                >
                    <h3>Buy</h3>
                </Button>
                {ModalComponent()}
            </form>
        </>
    )

    async function HandeleSumbmitAndSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            lowRangeAmount > 0 ||
            highRangeAmount > 0 ||
            solarpanelAmount > 0 ||
            temperatureSensorAmount > 0 ||
            microphoneSensorAmount > 0 ||
            weightSensorAmount > 0
        ) {
            // Show confirmation modal if no minicomputers selected.
            if (lowRangeAmount == 0 && highRangeAmount == 0) {
                await showChoiceModal({
                    titleContent: <h2>Don&apos;t buy any minicomputers?</h2>,
                    cancelText: "oops",
                    continueText: "thas's right",
                }) ? sendMail() : null
            } else {
                // Just open the mail if everything is okay.
                sendMail();
            }

        } else {
            // Show modal if no items are selected.
            await showChoiceModal({
                titleContent: <h2>Select at least 1 item.</h2>,
                cancelText: "okay",
                continueText: "No",
                isCancelButtonWarning: true
            }) ? router.back() : null
        }
    };

    // Construct an email with the amount of each item. create an A tag with mailto and click it.
    function sendMail() {
        const recipient = 'BeeWaryOrder@Email.com';
        const subject = 'Sensor module order';
        let body = "Hello Bee-Wary team,\n\nI would like to order the following items for my beehives:\n\n"
        lowRangeAmount > 0 ? body += lowRangeAmount + " Low-range sensor module(s).\n" : null;
        highRangeAmount > 0 ? body += highRangeAmount + " high-range sensor module(s).\n" : null;
        solarpanelAmount > 0 ? body += solarpanelAmount + " module solar panel(s).\n" : null;
        temperatureSensorAmount > 0 ? body += temperatureSensorAmount + " Temperature sensor(s).\n" : null;
        microphoneSensorAmount > 0 ? body += microphoneSensorAmount + " Microphone sensor(s).\n" : null;
        weightSensorAmount > 0 ? body += weightSensorAmount + " Weight sensor(s).\n" : null;
        body += "\nKind regards,\n\nName:   <Full name>\nAddres: <Address>\nMail:       <Contact mail>\nPhone:  <Phone number>"

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        const a = document.createElement('a');
        a.href = mailtoLink;
        a.click();
    }

};

export default SensorsBuyForm;