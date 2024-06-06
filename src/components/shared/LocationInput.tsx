"use client";
import { Input } from "@nextui-org/react";

type props = {
    latitiude: number;
    longitude: number;
    readOnly: boolean;
    setGeopointsCallback: (values: [number, number]) => void;
}

export default function LocationInput({ latitiude, longitude, readOnly, setGeopointsCallback }: props) {
    return (
        <div className="flex flex-row">
            <Input
                type="number"
                isReadOnly={readOnly}
                label="Latitude"
                labelPlacement='outside'
                value={latitiude.toString()}
                max={90}
                min={-90}
                step={0.000001}
                onChange={(event) => setGeopointsCallback([Number(event.target.value), longitude])}
                classNames={{
                    inputWrapper: [(readOnly ? "" : 'bg-petal-white-bright')]
                }} />
            <Input
                type="number"
                isReadOnly={readOnly}
                label="Longitude"
                labelPlacement='outside'
                value={longitude.toString()}
                max={90}
                min={-90}
                step={0.000001}
                onChange={(event) => setGeopointsCallback([latitiude, Number(event.target.value)])}
                classNames={{
                    inputWrapper: [(readOnly ? "" : 'bg-petal-white-bright')]
                }} />
        </div>
    )
}