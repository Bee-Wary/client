'use client';

import { Input } from "@nextui-org/react";
import { useState } from "react";
import LocationInput from "../shared/LocationInput";

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
            <div className="flex flex-row justify-between px-8">
                <h2>Information</h2>
                <button onClick={() => setReadmode(!readmode)}>
                    {readmode ? "Edit" : "Save"}
                </button>
            </div>
            <form className="px-8">
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
                <p>Location</p>
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