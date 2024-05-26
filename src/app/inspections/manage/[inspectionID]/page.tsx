import { getAllBeehiveNamesAndIDs } from '@/services/server/beehives/queries';
import { getFullInspectionByID } from "@/services/server/inspections/queries";
import { InspectionForm } from '@/components/inspection/inspectionForm';
import styles from '@/styles/inspections/inspectionsPage.module.scss';


const manageInspectionPage = async (
   { params }: 
   { params: { inspectionID: string }} 
) => {

   const allBeehivesNames: BeehiveName[] = (await getAllBeehiveNamesAndIDs()).documents
   const currentInspection: FullInspection | undefined = params.inspectionID 
      ? (await getFullInspectionByID(params.inspectionID)).documents
      : undefined;
   
   return (
     <InspectionForm 
      beehiveNames={allBeehivesNames}
      currentinspection={currentInspection}
      readmode={true}
      >
      
     </InspectionForm>
   );
}

export default manageInspectionPage;