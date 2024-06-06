'use client';

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import inputStyles from '@/styles/inputs/inputs.module.scss'
import LocationInput from "../shared/LocationInput";
import { useChoiceModal } from '@/utils/hooks/useChoiceModal';
import { Pencil, CheckCircle } from "@phosphor-icons/react/dist/ssr";

type props = {
    readOnly?: boolean;
    beehive?: Beehive;
}

export const BeehiveForm = ({ beehive, readOnly, }: props) => {
    const [readmode, setReadmode] = useState(readOnly || false)
    const { showChoiceModal, ModalComponent } = useChoiceModal();
    // Set default value of the beehive for create (no beehive passed).
    const [name, setName] = useState<string>(beehive?.name || "")
    const [material, setMaterial] = useState<string>(beehive?.material || "")
    const [queenMarking, setQueenMarking] = useState<string>(beehive?.queen.markingDescription || "")
    const [location, setLocation] = useState<GeoPoint>(beehive?.location || { type: "Point", coordinates: [0, 0] });
    const [frames, setFrames] = useState<Frame[]>(beehive?.frames || [])

    const setGeoPoint = (values: [number, number]) => {
        setLocation({ type: "Point", coordinates: values })
    }

    const handleFrames = (value: number) => {
        console.log(value);
        // On an existing beehive, If adding a frame add a frame with the default name.
        if (beehive?.frames && beehive.frames.length < value) {
            // TODO: Fix it so a new ID is generated in MongoDB.
            const _frames = [...frames, { id: "", title: `Frame ${value}` }];
            console.log("[debug] added frame: ", _frames);
            setFrames(_frames)
        }
        // On an existing beehive, If removing a frame remove the last frame.
        if (beehive?.frames && beehive.frames.length > value) {
            // TODO: fix delete of frames.
            const _frames = frames.slice(0, value);
            console.log("[debug] removed frame: ", _frames);
            setFrames(_frames)
        }

    }

    return (
        <>
            <div className="flex flex-row justify-between px-8 mb-4 mt-4 items-center">
                <h2>Information</h2>
                <Button
                    className={`${inputStyles.actionButton} p-3`}
                    size="lg"
                    endContent={<Pencil weight='fill' size={64} />}
                    onClick={() => readmode ? setReadmode(!readmode) : cancelEdit()}
                >
                    {readmode ? "Edit" : "Cancel"}
                </Button>
            </div>
            <form
                className="px-8 flex flex-col gap-4"
                onSubmit={(event) => HandeleSumbmitAndSave(event)}
            >
                <Input
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    label="Name"
                    labelPlacement='outside'
                    onValueChange={(value) => setName(value)}
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
                    onValueChange={(value) => setMaterial(value)}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}
                />
                <Input
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    label="Queen Marking description"
                    labelPlacement='outside'
                    value={queenMarking}
                    onValueChange={(value) => setQueenMarking(value)}
                />
                <LocationInput
                    latitiude={location.coordinates[0]}
                    longitude={location.coordinates[1]}
                    readOnly={readmode}
                    setGeopointsCallback={(values: [number, number]) => setGeoPoint(values)}
                />
                <Input
                    type="number"
                    isReadOnly={readmode}
                    isClearable={!readmode}
                    label="Frames"
                    labelPlacement='outside'
                    value={frames.length.toString()}
                    onValueChange={(value) => handleFrames(Number(value))}
                    min={0}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}
                />
                {frames.map((frame, index) => {
                    return (
                        <p key={index}>
                            {frame?.title}
                        </p>
                    )
                })}
                {readmode ?
                    null // Do not render save button if readmode is on.
                    :
                    <Button
                        type="submit"
                        className={inputStyles.saveButton}
                        startContent={<CheckCircle weight='fill' size={72} />}
                    >
                        <h3>Save</h3>
                    </Button>
                }
            </form>
            {ModalComponent()}
        </>
    );

    async function cancelEdit() {
        if (await showChoiceModal({
            titleContent: <h2>Remove changes?</h2>,
            cancelText: "Go back"
        })
        ) {
            setName(beehive?.name || "");
            setMaterial(beehive?.material || "");
            setQueenMarking(beehive?.queen.markingDescription || "");
            setLocation(beehive?.location || { type: "Point", coordinates: [0, 0] });
            setFrames(beehive?.frames || []);
            setReadmode(!readmode);
        }
    }

    function HandeleSumbmitAndSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // TODO: Preform the Create operation.
    }
};
