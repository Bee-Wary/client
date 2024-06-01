import { Input } from "@nextui-org/react";

type props = {
    lat: number;
    lng: number;
    readOnly: boolean;
}

export default function LocationInput({ lat, lng, readOnly }: props) {
    return (
        <div className="flex flex-row">
            <Input
                type="number"
                isReadOnly={readOnly}
                label="Latitude"
                labelPlacement='outside'
                value={lat.toString()}
                max={90}
                min={-90}
                classNames={{
                    inputWrapper: [(readOnly ? "" : 'bg-petal-white-bright')]
                }} />
            <Input
                type="number"
                isReadOnly={readOnly}
                label="Longitude"
                labelPlacement='outside'
                value={lng.toString()}
                max={90}
                min={-90}
                classNames={{
                    inputWrapper: [(readOnly ? "" : 'bg-petal-white-bright')]
                }} />
        </div>
    )
}