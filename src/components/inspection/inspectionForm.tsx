'use client';

import { Fragment, ReactNode } from 'react';
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import styles from '@/styles/inspections/inspectionsPage.module.scss';


// Children can be any node type (less type safe)
type Props = {
    beehiveNames?: BeehiveName[],
    currentinspection?: FullInspection ,
    // Children defenition:
    children?: ReactNode,
}

export const InspectionForm = ( props : Props) => {
    // Define default values for props.


    return (
        <>
        {props.beehiveNames ?
        <section className={styles.ListingContainer}>
            <h2>Connected beehive</h2>
            <Select 
                label="Beehive" 
                labelPlacement='outside'
                classNames={{
                    trigger: ['bg-petal-white-bright']
                }}
            >
                {props.beehiveNames.map((beehive) => (
                    <SelectItem key={beehive._id} value={beehive._id}>
                        {beehive.name}
                    </SelectItem>
                ))}
            </Select>
        </section>
        // Do not render dropdown if no beehive names are passed.
        : null
        }
        </>
    );
}

export default InspectionForm;