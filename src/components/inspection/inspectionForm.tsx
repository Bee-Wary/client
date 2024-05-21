'use client';

import { ReactNode, useState } from 'react';
import { Select, SelectItem, Input, Button, DatePicker } from "@nextui-org/react";
import { DateValue, parseDate } from "@internationalized/date";
import { Pencil, PencilSlash, CheckCircle    } from '@phosphor-icons/react/dist/ssr';
import { DateToStringDateYYMMDD, MakeMinimumTwoDigit } from '@/utils/helpers/dateTimeToString';
import { getFullInspectionByID, createNewInspection } from "@/services/inspections/queries";
import style from '@/styles/inspections/inspectionsPage.module.scss';
import inputStyles from '@/styles/inputs/inputs.module.scss'


// Children can be any node type (less type safe)
type Props = {
    beehiveNames?: BeehiveName[],
    connectedBeehive?: SummerizedBeehive,
    currentinspection?: FullInspection ,
    // Children defenition:
    children?: ReactNode,
}

export const InspectionForm = ( props : Props) => {
    const [readmode, setReadmode] = useState<boolean>(false);
    const [beehive , setBeehive] = useState<BeehiveName>({ _id: props.connectedBeehive?._id || '', name: props.connectedBeehive?.name || '' });
    const [inspectionTitle, setInspectionTitle] = useState<string>(props.currentinspection?.title || "");
    const [inspectionDate, setInspectionDate] = useState<DateValue>(parseDate(props.currentinspection?.creation_date || DateToStringDateYYMMDD( new Date(), "-")));    
    const [inspectionDescription, setInspectionDescription] = useState<string>(props.currentinspection?.description || "");
    const [inspectionFrames, setInspectionFrames] = useState<InspectionBeeFrame[]>(props.currentinspection?.frames || []);
    const [illness, setIllness] = useState<string>(props.currentinspection?.illness || "");
    const [medication, setMedication] = useState<string>(props.currentinspection?.medication || "");


    return (
    <form className='h-100%'>
        <section className={style.searchAndCrud}>
            <div className={style.searchField}>
                {/* Keep field for default flex spacing. */}
            </div>
            {readmode ?
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
                    onPress={() => showWarningModal()}
                >
                    {readmode ? "Edit" : "Cancel"}
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
                selectedKeys={[beehive._id]}
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
        {inspectionFrames && inspectionFrames.length !== 0 ?
            <section className={style.ListingContainer}>
                <h2>Frame Selection:</h2>
                {inspectionFrames.map((frame, index) => (
                    <div key={index}>
                        {frame.ref_frame}
                    </div>
                ))}
            </section>
        : null // Do not render dropdown if no beehive names are passed.
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

    function cancelEdit() {
        setInspectionTitle(props.currentinspection?.title || "");
        setBeehive({ _id: props.connectedBeehive?._id || '', name: props.connectedBeehive?.name || '' })
        setInspectionDate(parseDate(props.currentinspection?.creation_date || DateToStringDateYYMMDD( new Date(), "-")));
        setInspectionDescription(props.currentinspection?.description || "");
        setIllness(props.currentinspection?.illness || "");
        setMedication(props.currentinspection?.medication || "");
        setReadmode(true)
    } 

    function showWarningModal() {
        // TODO: logic to warn user about unsaved changes, cancelEdit on confirm.
        cancelEdit()
    }

    function handleBeehiveSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const _foundBeehiveName: BeehiveName = props.beehiveNames!.find(beehive => beehive._id === event.target.value)!;
        setBeehive(_foundBeehiveName); 
    }

    function HandeleSumbmitAndSave() {
        // TODO: Save the inspection to the database.
        // console.log(createNewInspection({
        //     title: inspectionTitle,
        //     description: inspectionDescription,
        //     frames: inspectionFrames,
        //     illness: illness,
        //     medication: medication, 
        //     ref_beehive: beehive._id, 
        //     creation_date: new Date(inspectionDate.toString()).toISOString(),
        //     e
        // }));
    }
}

export default InspectionForm;