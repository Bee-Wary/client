import { getAllBeehiveNamesAndIDs, getBeehiveByID } from '@/services/server/beehives/queries';
import { getInspectionWithBeehiveFrameDataByInspectionID } from "@/services/server/inspections/queries";
import { InspectionForm } from '@/components/inspection/inspectionForm';
import styles from '@/styles/inspections/inspectionsPage.module.scss';


const CreateInspectionPage = async (
   { params, searchParams }:
      {
         params: { inspectionID?: string }
         searchParams: { beehiveRefID?: string }
      }
) => {
   const allBeehivesNames: BeehiveName[] = (await getAllBeehiveNamesAndIDs()).documents



   // * This will be passed if editing a existing inspection ONLY.
   const currentInspection: FullInspection | undefined = params.inspectionID ?
      (await getInspectionWithBeehiveFrameDataByInspectionID(params.inspectionID)).documents[0]
      : undefined;

   // * This Will be querried after a beehive is selected, OR if a beehiveRefID is passed as searchparams, OR if a current inspectio has a ref-beehive.
   // via this we know how many frames there are needed.
   const connectedBeehive: Beehive | undefined = currentInspection?.ref_beehive ?
      (await getBeehiveByID(currentInspection.ref_beehive)).document
      :
      searchParams.beehiveRefID ?
         (await getBeehiveByID(searchParams.beehiveRefID)).document
         : undefined;

   return (
      <InspectionForm
         beehiveNames={allBeehivesNames}
         connectedBeehive={connectedBeehive}
         currentinspection={currentInspection}
      />
   );
}

export default CreateInspectionPage;