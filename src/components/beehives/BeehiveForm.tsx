'use client';

import { Input } from "@nextui-org/react";
import { useState } from "react";

type props = {
    name: string;
    readOnly: boolean;
}

export const BeehiveForm = ({readOnly, name} : props) => {
    const [readmode, setReadmode] = useState(readOnly || false)
    return (
        <>
            <div>
                <h2>General Info</h2>
                <button onClick={() => setReadmode(!readmode)}>
                    {readmode ? "Edit" : "Save"}
                </button>
            </div>
            <form>
                <Input
                    isReadOnly={readmode}
                    label="Name"
                    labelPlacement='outside'
                    value={name}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}
                    >
                    
                </Input>
            </form>
        </>
    );
};