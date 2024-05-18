import { getAllDetailedInspections, getAllDetailedInspectionsOfBeehiveByBeehiveRefID } from '@/services/inspections/queries';
import { InspectionCard } from '@/components/inspection/InspectionCard';
import Link from 'next/link';
import style from '@/styles/inspections/inspectionsPage.module.scss';

const InspectionsPage = async (
  { searchParams } :
  { searchParams?: { beehiveRefID?: string }}
) => {
  // Conditional if beeHiveRefID is provided.
  const allInspections: FullInspection[] = searchParams?.beehiveRefID ?
    (await getAllDetailedInspectionsOfBeehiveByBeehiveRefID( searchParams.beehiveRefID )).documents :
    (await getAllDetailedInspections()).documents
    
  return (
    <>
      <section className={style.ListingContainer}>
        {allInspections ? 
        allInspections.map((mongoDocument =>  
          <Link key={mongoDocument._id} href={`inspections/${mongoDocument._id}`}>
            <InspectionCard
              inspectionID={ mongoDocument._id }
              img="https://placehold.co/400x400/png"
              title={ mongoDocument.title }
              description={ mongoDocument.description}
              illness={ mongoDocument.illness }
              medication={ mongoDocument.medication }
              draft={ mongoDocument.draft }
              creation_date={ mongoDocument.creation_date }
              last_updated={ mongoDocument.last_updated }
            />
          </Link>
        ))
        : 
          "No Inspections found with this beehive!"
        }
      </section>
    </>
  );
}

export default InspectionsPage;