'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Select, SelectItem, Input, Button, DatePicker } from "@nextui-org/react";
import { DateValue, parseDate } from "@internationalized/date";
import { Pencil, PencilSlash, CheckCircle, CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import { DateToStringDateYYMMDD, MakeMinimumTwoDigit } from '@/utils/helpers/dateTimeToString';
import { getFullInspectionByID, createNewInspection } from "@/services/inspections/queries";
import { fetchBeehiveByID } from "@/services/beehives/routeFetches";
import style from '@/styles/inspections/inspectionsPage.module.scss';
import inputStyles from '@/styles/inputs/inputs.module.scss'

type Props = {
    beehiveNames?: BeehiveName[],
    connectedBeehive?: Beehive,
    currentinspection?: FullInspection ,
}

// ! first finish the create, this wil only have a beehive as ref,
export const InspectionForm = ( props : Props) => {
    const [readmode, setReadmode] = useState<boolean>(false);
    const [beehiveName , setBeehiveName] = useState<BeehiveName>({ _id: props.connectedBeehive?._id || '', name: props.connectedBeehive?.name || '' });
    const [connectedBeehive, setConnectedBeehive] = useState<Beehive | undefined>(props.connectedBeehive || undefined)
    const [inspectionTitle, setInspectionTitle] = useState<string>(props.currentinspection?.title || "");
    const [inspectionDate, setInspectionDate] = useState<DateValue>(parseDate(props.currentinspection?.creation_date || DateToStringDateYYMMDD( new Date(), "-")));    
    const [inspectionDescription, setInspectionDescription] = useState<string>(props.currentinspection?.description || "");
    // TODO: fallback for if there is no currentInspection frames but there is a connected beehive with frames passed.
    const [inspectionFrames, setInspectionFrames] = useState<InspectionBeeFrame[]>(props.currentinspection?.frames || props.connectedBeehive?.frames as InspectionBeeFrame[] || []);
    const [illness, setIllness] = useState<string>(props.currentinspection?.illness || "");
    const [medication, setMedication] = useState<string>(props.currentinspection?.medication || "");
    const [inspectionDraft, setInspectionDraft] = useState<boolean>(true)

    return (
    <form className='h-100%'>
        <section className={style.searchAndCrud}>
            <div className={style.searchField}>
                {/* Keep field for default flex spacing. */}
            </div>
            {readmode ? // Each button has different logic.
                <Button 
                    className={`${style.actionButton} p-3`}
                    size="lg"
                    endContent={<Pencil  weight='fill' size={64}/>}
                    onPress={() => setReadmode(false)}
                >
                    Edit
                </Button>
                :
                <Button 
                    className={`${style.actionButton} p-3`}
                    size="lg"
                    endContent={<PencilSlash  weight='fill' size={64}/>}
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

                    onChange={(value) => {setInspectionDate(parseDate(value.year + "-" + MakeMinimumTwoDigit(value.month) + "-" + MakeMinimumTwoDigit(value.day)))}}
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
                    <Button
                        id='frameCarouselLeft' 
                        isIconOnly
                        onPress={(event) => carouselLeft(event)}
                    >
                        <CaretLeft  weight='fill'/>
                    </Button>
                    <Button 
                        id='frameCarouselRight' 
                        isIconOnly
                        onPress={(event) => carouselRight(event)}
                    >
                        <CaretRight weight='fill'/>
                    </Button>
                    <ul id='frameContent'>
                    {inspectionFrames.map((frame, index) => (
                        <li key={frame.id}>
                            {frame.title} {frame.id}
                        </li>
                    ))}
                    </ul>
                </div>
            </section>
        : null // Do not render dropdown if no beehive is connected.
        } 
        <section className={`${style.ListingContainer} ${readmode ? "" : "pb-[80px]"}` }>
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
            startContent={<CheckCircle weight='fill' size={72}/>}
            onPress={() => HandeleSumbmitAndSave()}
        >
            <h3>Save</h3>  
        </Button>
        }
    </form>
    );


    function showWarningModal(): boolean {
        // TODO: logic to warn user about unsaved changes, cancelEdit on confirm.
        return true
    }

    function carouselLeft(event: any) {
        console.log(event);
        // document.getElementById("frameContent")?.scrollLeft 
    }
    function carouselRight(event: any) {
        console.log(event);
        // document.getElementById("frameContent")?.scrollLeft
    }

    async function handleBeehiveSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const _foundBeehiveName: BeehiveName = props.beehiveNames!.find(beehive => beehive._id === event.target.value)!;
        setBeehiveName(_foundBeehiveName);
        if (_foundBeehiveName && _foundBeehiveName._id) {
            let _currentBeehive = await fetchBeehiveByID(_foundBeehiveName._id);
            setConnectedBeehive(_currentBeehive);
            setInspectionFrames(_currentBeehive.frames);
        } else {
            setConnectedBeehive(undefined);
            setInspectionFrames([]);
        }
    }

    function cancelEdit() {
        if(showWarningModal()) {
            setBeehiveName({ _id: props.connectedBeehive?._id || '', name: props.connectedBeehive?.name || '' })
            setInspectionTitle(props.currentinspection?.title || "");
            setInspectionDate(parseDate(props.currentinspection?.creation_date || DateToStringDateYYMMDD( new Date(), "-")));
            setInspectionDescription(props.currentinspection?.description || "");
            setInspectionFrames(props.currentinspection?.frames || []);
            setIllness(props.currentinspection?.illness || "");
            setMedication(props.currentinspection?.medication || "");
            setReadmode(true)
        }
    } 

    async function HandeleSumbmitAndSave() {
        // TODO: Save the inspection to the database.
        (await createNewInspection({
            title: inspectionTitle,
            description: inspectionDescription,
            frames: inspectionFrames,
            illness: illness,
            medication: medication,
            ref_beehive: connectedBeehive?._id || "",
            creation_date: new Date(inspectionDate.toString()).toISOString(),
            last_updated: new Date().toISOString(),
            draft: inspectionDraft
        }));
    }
}

export default InspectionForm;