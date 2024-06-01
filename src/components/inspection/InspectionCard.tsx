import { Heartbeat, Pill, PencilSimple, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { DateToStringDateDDMMYY, DateToStringTime } from "@/utils/helpers/dateTimeToString";
import BadgeIndicatorRow from "@/components/shared/indicators/badgeIndicatorRow";
import BadgeIndicator from "@/components/shared/indicators/badgeIndicator";
import style from "@/styles/inspections/inspectionCard.module.scss";

interface Props {
    inspectionID: string;
    img: string;
    title: string;
    description?: string;
    illness?: string;
    medication?: string;
    draft?: boolean;
    creation_date: string;
    last_updated?: string;
}

export function InspectionCard(
    { inspectionID, img, title, description, illness, medication, draft, creation_date, last_updated }
        : Props
) {
    const creationDateConvertedToDate: Date = new Date(creation_date);

    return (
        <article className={style.inspectionCard}>
            <div>
                {/* Random image loading with the defenition with time to return random values. this banchmarks load times. */}
                <Image src={"https://picsum.photos/400?random&rnd" + new Date().getTime() + ")"} width={400} height={400} alt={`Image of ${title}`} />
            </div>
            <div>
                <div className={style.headingContainer}>
                    <h3 >{title}</h3>
                    <BadgeIndicatorRow>
                        <BadgeIndicator
                            isNegative={illness ? true : undefined}
                        >
                            <Heartbeat weight="fill" />
                        </BadgeIndicator>
                        <BadgeIndicator
                            isNegative={medication ? true : undefined}
                        // Define a route with pathname and routeSectionID to scroll to a specific section of the page.
                        // route={{ pathname: `inspections/${inspectionID}`, routeSectionID: 'medication' }}
                        >
                            <Pill weight="fill" />
                        </BadgeIndicator>
                        <BadgeIndicator
                            isNegative={draft ? draft : undefined}
                        // Define a route with a pathname only, to make it a link.
                        // route={{ pathname: `inspections/${inspectionID}`}}
                        >
                            <PencilSimple weight="fill" />
                        </BadgeIndicator>
                    </BadgeIndicatorRow>
                </div>
                <div className={style.infoRow}>
                    <CalendarBlank weight="fill" />
                    <h4>Created:</h4>
                    <p>{DateToStringDateDDMMYY(creationDateConvertedToDate)} {DateToStringTime(creationDateConvertedToDate)}</p>
                </div>
                <div className={style.infoRow}>
                    <PencilSimple weight="fill" />
                    <h4>Description:</h4>
                    <p>{description}</p>
                </div>
            </div>
        </article>
    )
}


export default InspectionCard;