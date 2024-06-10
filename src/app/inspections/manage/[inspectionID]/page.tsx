import { getAllBeehiveNamesAndIDs, getBeehiveByID } from '@/services/server/beehives/queries';
import { getInspectionWithBeehiveFrameDataByInspectionID } from "@/services/server/inspections/queries";
import { InspectionForm } from '@/components/inspection/inspectionForm';


const manageInspectionPage = async (
   { params }:
      { params: { inspectionID: string } }
) => {

   const allBeehivesNames: BeehiveName[] = (await getAllBeehiveNamesAndIDs()).documents

   const currentInspection: FullInspection = (await getInspectionWithBeehiveFrameDataByInspectionID(params.inspectionID)).documents[0]

   const connectedBeehive: Beehive | undefined = currentInspection.ref_beehive ?
      (await getBeehiveByID(currentInspection.ref_beehive)).document
      : undefined;

   return (
      <InspectionForm
         beehiveNames={allBeehivesNames}
         currentinspection={currentInspection}
         connectedBeehive={connectedBeehive}
         readmode={true}
      >

      </InspectionForm>
   );
}

export default manageInspectionPage;