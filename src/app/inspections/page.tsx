import { getAllFullyDetailedInspections, getAllFullyDetailedInspectionsByBeehiveRefID } from '@/services/inspections/queries';
import { InspectionCard } from '@/components/inspection/InspectionCard';
import { Button } from "@nextui-org/react";
import { PlusCircle } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import style from '@/styles/inspections/inspectionsPage.module.scss';

const InspectionsPage = async (
  { searchParams } :
  { searchParams?: { beehiveRefID?: string }}
) => {
  // Conditional if beeHiveRefID is provided.
  const allInspections: FullInspection[] = searchParams?.beehiveRefID ?
    (await getAllFullyDetailedInspectionsByBeehiveRefID( searchParams.beehiveRefID )).documents :
    (await getAllFullyDetailedInspections()).documents

  // TODO: make query to get single beehive by ID.
  // const currentBeehive: SummerizedBeehive | null = searchParams?.beehiveRefID ?
  //   (await getSummerizedBeehiveByID(searchParams.beehiveRefID)).document
  //   : null ;

    

  return (
    <>
      {/* {currentBeehive ? 
        <Link key={currentBeehive._id} href={{
            pathname: `beehives/${currentBeehive._id}`,
        }}>
          <HiveCard
            img="https://placehold.co/400x400/png"
            name={currentBeehive.name}
            lastInspection={currentBeehive.last_inspection ? new Date(currentBeehive.last_inspection.last_updated) : undefined}
            illness={(currentBeehive.last_inspection && currentBeehive.last_inspection.illness) ? true : false}
            location={currentBeehive.location.coordinates}
            sensor={currentBeehive.last_sensor_entry ? true : false}
            />
          </Link>
        : null
      } */}
    
      {/* TODO: change this section to search and CRUD component. */}
      <section className={style.searchAndCrud}>
        <div className={style.searchField}>
          {/* Insert search field */}
        </div>
        <Link href={{
          pathname: '/inspections/create/',
          query: searchParams ? { beehiveRefID: searchParams.beehiveRefID } : null
        }}>
          <Button 
            className='p-3 '
            size="lg"
            endContent={<PlusCircle 
            weight='fill' size={64}/>}
          >
            Create<br/>note
          </Button>  
        </Link> 
      </section>

      {/** Problem beehive section.  **/}
      <section className={style.ListingContainer}>
        {allInspections ? 
        <>
          <h2>Inspections with problems:</h2>
          {allInspections.map((mongoDocument => 
            mongoDocument.illness || mongoDocument.medication || mongoDocument.draft ? 
              <Link key={mongoDocument._id} href={{
                  pathname: `inspections/manage/${mongoDocument._id}`,
                  query: {beehiveRefID: searchParams?.beehiveRefID ?? undefined}
                }}>
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
              // Do not render anything if illness, medication and draft are all false.
              : null
          ))}
        </> 
        // Do not render anything if no inspections are found.
        :  null
        }
      </section>

      {/** All beehive section.  **/}
      <section className={style.ListingContainer}>
        <h2>All inspections:</h2>
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
        : "There are no inspections for this beehive."
        }
      </section>
    </>
  );
}

export default InspectionsPage;