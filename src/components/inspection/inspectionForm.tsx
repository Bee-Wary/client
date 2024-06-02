'use client';

import { useState } from 'react';
import { Select, SelectItem, Input, Button, DatePicker, Slider } from "@nextui-org/react";
import { DateValue, parseDate } from "@internationalized/date";
import { Pencil, PencilSlash, CheckCircle, CaretLeft, CaretRight, Crown } from '@phosphor-icons/react/dist/ssr';
import { DateToStringDateYYMMDD, MakeMinimumTwoDigit } from '@/utils/helpers/dateTimeToString';
import { fetchCreateNewInspection } from "@/services/client/inspections/routeFetches";
import { fetchBeehiveByID } from "@/services/client/beehives/routeFetches";
import { useRouter } from 'next/navigation'
import { useChoiceModal } from '@/utils/hooks/useChoiceModal';

import style from '@/styles/inspections/inspectionsPage.module.scss';
import inputStyles from '@/styles/inputs/inputs.module.scss'

type Props = {
    beehiveNames?: BeehiveName[],
    connectedBeehive?: Beehive,
    currentinspection?: FullInspection,
    readmode?: boolean,
}

// * the create, wil only need a beehive as ref,
export const InspectionForm = (props: Props) => {
    const router = useRouter();
    const { showChoiceModalFunction, ModalComponent } = useChoiceModal();
    const [readmode, setReadmode] = useState<boolean>(props.readmode || false);
    const [beehiveName, setBeehiveName] = useState<BeehiveName>({ _id: props.connectedBeehive?._id || '', name: props.connectedBeehive?.name || '' });
    const [connectedBeehive, setConnectedBeehive] = useState<Beehive | undefined>(props.connectedBeehive || undefined)
    const [inspectionTitle, setInspectionTitle] = useState<string>(props.currentinspection?.title || "");
    const [inspectionDate, setInspectionDate] = useState<DateValue>(parseDate(props.currentinspection?.creation_date || DateToStringDateYYMMDD(new Date(), "-")));
    const [inspectionDescription, setInspectionDescription] = useState<string>(props.currentinspection?.description || "");
    const [inspectionFrames, setInspectionFrames] = useState<InspectionBeeFrame[]>(props.currentinspection?.frames || props.connectedBeehive?.frames as InspectionBeeFrame[] || []);
    const [illness, setIllness] = useState<string>(props.currentinspection?.illness || "");
    const [medication, setMedication] = useState<string>(props.currentinspection?.medication || "");

    return (
        <form
            className='h-100%'
            onSubmit={(event) => HandeleSumbmitAndSave(event)}
        >
            <section className={inputStyles.searchAndCrud}>
                <div className={inputStyles.searchField}>
                    {/* Keep field for default flex spacing. */}
                </div>
                {readmode ? // Each button has different logic.
                    <Button
                        className={`${inputStyles.actionButton} p-3`}
                        size="lg"
                        endContent={<Pencil weight='fill' size={64} />}
                        onPress={() => setReadmode(false)}
                    >
                        Edit
                    </Button>
                    :
                    <Button
                        className={`${inputStyles.actionButton} p-3`}
                        size="lg"
                        endContent={<PencilSlash weight='fill' size={64} />}
                        onPress={() => cancelEdit()}
                    >
                        Cancel
                    </Button>
                }
            </section>

            {props.beehiveNames ?
                <section className={style.ListingContainer}>
                    <h2>Connected beehive</h2>
                    <Select
                        isDisabled={readmode}
                        label="Beehive"
                        labelPlacement='outside'
                        selectionMode="single"
                        placeholder="Connect a beehive"
                        selectedKeys={[beehiveName?._id]}
                        onChange={handleBeehiveSelectionChange}
                        classNames={{
                            trigger: [(readmode ? "" : 'bg-petal-white-bright')]
                        }}
                    >
                        {props.beehiveNames.map((beehive) => (
                            <SelectItem key={beehive._id} textValue={beehive.name} value={beehive._id}>
                                {beehive.name}
                            </SelectItem>
                        ))}
                    </Select>
                </section>
                : null // Do not render dropdown if no beehive names are passed.
            }

            <section className={style.ListingContainer}>
                <h2>Inspection info:</h2>
                <Input
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    isRequired
                    type="text"
                    label="Title"
                    labelPlacement='outside'
                    placeholder="Inspection title"
                    value={inspectionTitle}

                    onValueChange={(value) => (setInspectionTitle(value))}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}
                />
                <div className='row'>
                    <DatePicker
                        className={readmode ? "" : inputStyles.datePicker}
                        isReadOnly={readmode}
                        shouldForceLeadingZeros
                        label="Date"
                        labelPlacement='outside'
                        value={inspectionDate}

                        onChange={(value) => { setInspectionDate(parseDate(value.year + "-" + MakeMinimumTwoDigit(value.month) + "-" + MakeMinimumTwoDigit(value.day))) }}
                    />

                </div>
                <Input
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    type="text"
                    label="Description"
                    labelPlacement='outside'
                    placeholder="Inspection description"
                    value={inspectionDescription}

                    onValueChange={(value) => (setInspectionDescription(value))}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}
                />
            </section>
            {/* //TODO: Finish carousel. */}
            {connectedBeehive && inspectionFrames.length >= 1 ?
                <section className={style.ListingContainer}>
                    <h2>Frame Selection:</h2>
                    <div id='frameCarousel' className={style.carousel}>
                        <div className={style.carouselButtonContainer}>
                            <Button
                                id='frameCarouselLeft'
                                isIconOnly
                                onPress={() => carouselScroll(-1)}
                            >
                                <CaretLeft weight='fill' />
                            </Button>
                            <Button
                                id='frameCarouselRight'
                                isIconOnly
                                onPress={() => carouselScroll(1)}
                            >
                                <CaretRight weight='fill' />
                            </Button>
                        </div>
                        <ul id='frameContent'>
                            {inspectionFrames.map((frame, index) => (
                                <li key={frame.id}>
                                    <h4>{frame.title}</h4>
                                    <div className='flex justify-center'>
                                        {frame.queen_present ?
                                            <Button
                                                className={`${inputStyles.actionButton}  flex flex-col gap-0 align-self-center p-3`}
                                                isDisabled={readmode}
                                                startContent={<Crown weight='fill' size={64} />}
                                                onPress={() => updateFrameArrayValue(frame.id, "queen_present", false)}
                                            >
                                                Queen
                                            </Button>
                                            :
                                            <Button
                                                className={`${inputStyles.actionButton} ${inputStyles.unselected} flex flex-col gap-0 align-self-center p-3`}
                                                isDisabled={readmode}
                                                startContent={<Crown weight='fill' size={64} />}
                                                onPress={() => updateFrameArrayValue(frame.id, "queen_present", true)}
                                            >
                                                Queen
                                            </Button>
                                        }
                                    </div>
                                    <Slider
                                        className={inputStyles.slider}
                                        size="lg"
                                        step={10}
                                        isDisabled={readmode}
                                        label="Brood %"
                                        showSteps={true}
                                        maxValue={100}
                                        minValue={0}
                                        value={frame.brood_percentage || 0}
                                        onChange={(value) => updateFrameArrayValue(frame.id, "brood_percentage", Number(value))}
                                        marks={[
                                            { value: 0, label: "0%" },
                                            { value: 20, label: "20%" },
                                            { value: 40, label: "40%" },
                                            { value: 60, label: "60%" },
                                            { value: 80, label: "80%" },
                                            { value: 100, label: "100%" },
                                        ]}
                                    />
                                    <Slider
                                        className={inputStyles.slider}
                                        size="lg"
                                        step={10}
                                        isDisabled={readmode}
                                        label="Pollen %"
                                        showSteps={true}
                                        maxValue={100}
                                        minValue={0}
                                        value={frame.pollen_percentage || 0}
                                        onChange={(value) => updateFrameArrayValue(frame.id, "pollen_percentage", Number(value))}
                                        marks={[
                                            { value: 0, label: "0%" },
                                            { value: 20, label: "20%" },
                                            { value: 40, label: "40%" },
                                            { value: 60, label: "60%" },
                                            { value: 80, label: "80%" },
                                            { value: 100, label: "100%" },
                                        ]}
                                    />
                                    <Slider
                                        className={inputStyles.slider}
                                        size="lg"
                                        step={10}
                                        isDisabled={readmode}
                                        label="Honey %"
                                        showSteps={true}
                                        maxValue={100}
                                        minValue={0}
                                        value={frame.honey_percentage || 0}
                                        onChange={(value) => updateFrameArrayValue(frame.id, "honey_percentage", Number(value))}
                                        marks={[
                                            { value: 0, label: "0%" },
                                            { value: 20, label: "20%" },
                                            { value: 40, label: "40%" },
                                            { value: 60, label: "60%" },
                                            { value: 80, label: "80%" },
                                            { value: 100, label: "100%" },
                                        ]}
                                    />

                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                : null // Do not render dropdown if no beehive is connected.
            }
            <section className={`${style.ListingContainer} ${readmode ? "" : "pb-[80px]"}`}>
                <h2>Mitigations:</h2>
                <Input
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    type="text"
                    label="Illnesses / bugs"
                    labelPlacement='outside'
                    placeholder="Illnesses / bugs noticed"
                    value={illness}

                    onValueChange={(value) => (setIllness(value))}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}
                />
                <Input
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    type="text"
                    label="Medication"
                    labelPlacement='outside'
                    placeholder="Medication applied"
                    value={medication}

                    onValueChange={(value) => (setMedication(value))}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}
                />
            </section>

            {readmode ?
                null // Do not render save button if readmode is on.
                :
                <Button
                    type="submit"
                    className={inputStyles.saveButton}
                    startContent={<CheckCircle weight='fill' size={72} />}
                // onPress={() => HandeleSumbmitAndSave()}
                >
                    <h3>Save</h3>
                </Button>
            }
            {ModalComponent()}
        </form>
    );


    async function showWarningModal(): Promise<boolean> {
        return await showChoiceModalFunction({
            titleContent: <h2>Remove changes?</h2>,
            cancelText: "Go back"
        })
    }

    function carouselScroll(directionNumber: 1 | -1) {
        const _frameContent = document.getElementById("frameContent");
        const _frameWidth = document.querySelector("#frameContent li")!.clientWidth;
        _frameContent!.scrollLeft += (_frameWidth * directionNumber)
    }

    async function handleBeehiveSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const _foundBeehiveName: BeehiveName = props.beehiveNames!.find(beehive => beehive._id === event.target.value)!;
        setBeehiveName(_foundBeehiveName);
        if (_foundBeehiveName && _foundBeehiveName._id) {
            await fetchBeehiveByID(_foundBeehiveName._id)
                .then((_currentBeehive) => {
                    setConnectedBeehive(_currentBeehive);
                    if (props.currentinspection && props.currentinspection?.frames) {
                        setInspectionFrames(props.currentinspection!.frames)
                    } else {
                        const _convertedFrames = _currentBeehive?.frames.map(frame => {
                            return {
                                id: frame.id,
                                title: frame.title,
                                queen_present: false,
                                brood_percentage: 0,
                                pollen_percentage: 0,
                                honey_percentage: 0
                            }
                        })
                        setInspectionFrames(_convertedFrames)
                    }
                });
        } else {
            setConnectedBeehive(undefined);
            setInspectionFrames([]);
        }
    }

    function updateFrameArrayValue(id: string, key: string, value: string | boolean | number) {
        const index = inspectionFrames.findIndex(frame => frame.id === id);

        if (index !== -1) {
            // Create a new array with the updated object
            const updatedInspectionFrames = [
                ...inspectionFrames.slice(0, index),
                { ...inspectionFrames[index], [key]: value },
                ...inspectionFrames.slice(index + 1)
            ];
            setInspectionFrames(updatedInspectionFrames);
        }
    }

    async function cancelEdit() {
        if (await showWarningModal()) {
            setBeehiveName({ _id: props.connectedBeehive?._id || '', name: props.connectedBeehive?.name || '' })
            setInspectionTitle(props.currentinspection?.title || "");
            setInspectionDate(parseDate(props.currentinspection?.creation_date || DateToStringDateYYMMDD(new Date(), "-")));
            setInspectionDescription(props.currentinspection?.description || "");
            setInspectionFrames(props.currentinspection?.frames || props.connectedBeehive?.frames as InspectionBeeFrame[] || []);
            setIllness(props.currentinspection?.illness || "");
            setMedication(props.currentinspection?.medication || "");
            setReadmode(true);
        }
    }

    async function HandeleSumbmitAndSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (inspectionTitle !== null) {
            const _inspectionSave: BaseFullInspection = {
                title: inspectionTitle,
                description: inspectionDescription,
                frames: inspectionFrames,
                illness: illness,
                medication: medication,
                ref_beehive: connectedBeehive?._id || "",
                creation_date: new Date(inspectionDate.toString()).toISOString(),
                last_updated: new Date().toISOString(),
                draft: !(inspectionTitle && inspectionDescription && inspectionFrames.find(
                    frame => frame.hasOwnProperty("queen_present") && (frame as InspectionBeeFrame).queen_present === true
                ))
            };
            await fetchCreateNewInspection(_inspectionSave).then(() => {
                router.back();
            });
        }
    }
}

export default InspectionForm;