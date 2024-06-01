'use client';

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import inputStyles from '@/styles/inputs/inputs.module.scss'
import LocationInput from "../shared/LocationInput";
import { Pencil } from "@phosphor-icons/react/dist/ssr";

type props = {
    name: string;
    material: string;
    location: GeoPoint;
    readOnly: boolean;
    queen: Queen;
    frames: Frame[];
}

export const BeehiveForm = ({readOnly, name, material, location, queen, frames} : props) => {
    const [readmode, setReadmode] = useState(readOnly || false)
    return (
        <>
            <div className="flex flex-row justify-between px-8 mb-4 mt-4 items-center">
                <h2>Information</h2>
                <Button 
                    className={`${inputStyles.actionButton} p-3`}
                    size="lg"
                    endContent={<Pencil  weight='fill' size={64}/>}
                    onClick={() => setReadmode(!readmode)}
                >
                    {readmode ? "Edit" : "Save"}
                </Button>
            </div>
            <form className="px-8 flex flex-col gap-4">
                <Input
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    label="Name"
                    labelPlacement='outside'
                    value={name}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}
                />
                <Input
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    label="Material"
                    labelPlacement='outside'
                    value={material}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}
                />
                <Input 
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    label="Queen Marking descriptrion"
                    labelPlacement='outside'
                    value={queen.markingDescription} />
                <LocationInput 
                    lat={location.coordinates[0]} 
                    lng={location.coordinates[1]} 
                    readOnly={readmode}/>
                <Input
                    type="number"
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    label="Frames"
                    labelPlacement='outside'
                    value={frames.length.toString()}
                    min={0}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}/>
            </form>
        </>
    );
};