'use client';

import { ReactNode, useState } from 'react';
import { Select, SelectItem, SelectedItems, Input, Button } from "@nextui-org/react";
import { Pencil, PencilSlash    } from '@phosphor-icons/react/dist/ssr';
import style from '@/styles/inspections/inspectionsPage.module.scss';


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
    const [title, setTitle] = useState<string>(props.currentinspection?.title || "");

    return (
        <>
        <section className={style.searchAndCrud}>
            <div className={style.searchField}>
            {/* Insert search field */}
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
                    onPress={() => cancelEdit()}
                >
                    {readmode ? "Edit" : "Cancel"}
                </Button>
            }  
        </section>

        {props.beehiveNames ?
        <section className={style.ListingContainer}>
            <h2>Connected beehive</h2>
            <Select 
                label="Beehive" 
                labelPlacement='outside'
                selectionMode="single"
                isDisabled={readmode}
                onChange={handleBeehiveSelectionChange}
                selectedKeys={[beehive._id]}
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
        // Do not render dropdown if no beehive names are passed.
        : null
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
                value={title}
                
                onValueChange={(value) => (setTitle(value))}
                classNames={{
                    inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                }}
            />
        </section>
        </>
    );

    function cancelEdit() {
        setTitle(props.currentinspection?.title || "");
        setBeehive({ _id: props.connectedBeehive?._id || '', name: props.connectedBeehive?.name || '' })
        setReadmode(true)
    } 

    function handleBeehiveSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const _foundBeehiveName: BeehiveName = props.beehiveNames!.find(beehive => beehive._id === event.target.value)!;
        setBeehive(_foundBeehiveName);
        
    }
}

export default InspectionForm;