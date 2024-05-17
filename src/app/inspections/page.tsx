import { getSummerizedInspections, getInspectionsOfBeehiveByBeehiveRefID } from '@/services/inspections/queries';

import InspectionDetailButton from '@/components/inspection/inspectionDetailButton';
import Link from 'next/link';

const InsepctionsPage = async (
  { searchParams } :
  { searchParams?: { beehiveRefID?: string }}
) => {
  const hardcodedBeehiveID = "662f5e43f49b7c7d7a3adc54";
  const allInspections = searchParams?.beehiveRefID ?
    (await getInspectionsOfBeehiveByBeehiveRefID(hardcodedBeehiveID)).documents :
    (await getSummerizedInspections()).documents

  return (
    <>
      <p>
        {allInspections ? 
        allInspections.map((mongoDocument =>  
          <Link key={mongoDocument._id} href={`inspections/${mongoDocument._id}`}>
            <InspectionDetailButton
              inspectionTitle={mongoDocument.title}
              inspectionID={mongoDocument._id}>
            </InspectionDetailButton>
          </Link>
        ))
        : 
          "No Inspections found with this beehive!"
        }
      </p>
      <p>InspectionsPage</p>
    </>
  );
}

export default InsepctionsPage;