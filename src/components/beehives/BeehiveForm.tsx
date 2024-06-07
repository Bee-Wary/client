'use client';

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useChoiceModal } from '@/utils/hooks/useChoiceModal';
import { Pencil, CheckCircle, Cross, X } from "@phosphor-icons/react/dist/ssr";
import { fetchCreateNewBeehive, fetchDeleteBeehive, fetchUpdateBeehive } from '@/services/client/beehives/routeFetches';
import inputStyles from '@/styles/inputs/inputs.module.scss'
import styles from '@/styles/beehives/beehivePage.module.scss'
import LocationInput from "../shared/LocationInput";
import { parse } from "path";

type props = {
    readOnly?: boolean;
    beehive?: Beehive;
}

export const BeehiveForm = ({ beehive, readOnly, }: props) => {
    const router = useRouter();
    const [readmode, setReadmode] = useState(readOnly || false)
    const { showChoiceModal, ModalComponent } = useChoiceModal();
    // Set default value of the beehive for create (no beehive passed).
    const [name, setName] = useState<string>(beehive?.name || "")
    const [material, setMaterial] = useState<string>(beehive?.material || "")
    const [queenMarking, setQueenMarking] = useState<string>(beehive?.queen?.markingDescription || "")
    const [location, setLocation] = useState<GeoPoint>(beehive?.location || { type: "Point", coordinates: [0.000001, 0.000001] });
    const [frames, setFrames] = useState<Frame[]>(beehive?.frames || [])
    const [framesInputNumber, setFramesInputNumber] = useState<Number>(beehive?.frames?.length || 0)

    return (
        <>
            <div className="flex flex-row justify-between px-8 mb-4 mt-4 items-center">
                <h2>Information</h2>
                <Button
                    className={`${inputStyles.actionButton} p-3`}
                    size="lg"
                    endContent={readmode ? <Pencil weight='fill' size={64}/> : <X weight='fill' size={64} />}
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
                    required
                    label="Name"
                    labelPlacement='outside'
                    placeholder="Enter a name"
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
                    placeholder="Enter a material"
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
                    placeholder="Enter a marking"
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
                    label="Frames"
                    labelPlacement='outside'
                    value={String(framesInputNumber)}
                    onValueChange={(value) => handleFrames(Number(value))}
                    min={0}
                    classNames={{
                        inputWrapper: [(readmode ? "" : 'bg-petal-white-bright')]
                    }}
                />
                {/* Visual frame mapping for debug purposes */}
                {/* {frames.map((frame, index) => {
                    return (
                        <p key={index}>
                            {frame?.title}
                        </p>
                    )
                })} */}
                <section className={`${styles.ListingContainer} ${readmode ? "" : "pt-[24px] pb-[24px]"}`}>
                    {beehive && !readmode ?
                        <Button onClick={handelDelete} className={inputStyles.deleteButton}>
                            Delete Inspection
                        </Button>
                        :
                        null
                    }
                </section>

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

    function setGeoPoint(values: [number, number]) {
        setLocation({ type: "Point", coordinates: values });
    }

    function handleFrames(value: number) {
        // Add a frame if the value is higher than the current frame count.
        if (frames.length < value) {
            // Use a single setFrame call to not trigger multiple re-renders.
            setFrames(previousFrameArray => {
                const updatedFrames = [...previousFrameArray];
                // A loop if a high value was set manually.
                for (let amount = updatedFrames.length + 1; amount <= value; amount++) {
                    // Check for existing beehive and frames to be re-added 
                    if (beehive?.frames && beehive.frames.length >= amount) {
                        // Re-add original frame to match original frameId.
                        updatedFrames.push(beehive.frames[amount - 1]);
                    }
                }
                // Add new frames if beyond the original frame amount.
                for (let amount = updatedFrames.length + 1; amount <= value; amount++) {
                    // If bigger than original frame size or no beehive connected, add frame with the default name and no Id.
                    updatedFrames.push({ title: `Frame ${amount}` } as Frame);
                }
                return updatedFrames;
            });

        } else if (frames.length > value) {
            // Remove a frame if the value is lower than the current frame amount.
            const _frames: Frame[] = frames.slice(0, value);
            setFrames(_frames)
        }
        // Input number split from array length for manual inputs.
        setFramesInputNumber(value);
    }

    async function cancelEdit() {
        if (await showChoiceModal({
            titleContent: <h2>Remove changes?</h2>,
            cancelText: "Go back"
        })
        ) {
            setName(beehive?.name || "");
            setMaterial(beehive?.material || "");
            setQueenMarking(beehive?.queen.markingDescription || "");
            setLocation(beehive?.location || { type: "Point", coordinates: [0.000001, 0.000001] });
            setFrames(beehive?.frames || []);
            setReadmode(!readmode);
        }
    }

    async function HandeleSumbmitAndSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (name) {
            const _beehiveSave: BaseBeehive = {
                name: name,
                location: {
                    type: "Point",
                    // Set a decimal point if there is none (Need for JSON payload).
                    coordinates: [
                        location.coordinates[0] === Math.floor(location.coordinates[0]) ? location.coordinates[0] + 0.000001 : location.coordinates[0],
                        location.coordinates[1] === Math.floor(location.coordinates[1]) ? location.coordinates[1] + 0.000001 : location.coordinates[1]
                    ]
                },
                material: material,
                frames: frames,
                queen: {
                    creationDate: beehive?.queen.creationDate || new Date().toISOString(),
                    markingDescription: queenMarking
                },
                creation_date: beehive?.creation_date || new Date().toISOString()
            }

            if (beehive) {
                await fetchUpdateBeehive(beehive._id, _beehiveSave).then(() => {
                    router.push("/");
                    router.refresh()
                });
            } else {
                await fetchCreateNewBeehive(_beehiveSave).then(() => {
                    router.push("/");
                    router.refresh()
                });
            }
        }
    }

    async function handelDelete() {
        if (await showChoiceModal({
            titleContent: <h2>Delete beehive?</h2>,
            cancelText: "Don't"
        })
        ) {
            await fetchDeleteBeehive(beehive!._id).then(() => {
                router.push("/");
                router.refresh();
            });
        }
    }
};
