import { getAllBeehiveNamesAndIDs } from '@/services/beehives/queries';
import { getFullInspectionByID } from "@/services/inspections/queries";
import { InspectionForm } from '@/components/inspection/inspectionForm';
import styles from '@/styles/inspections/inspectionsPage.module.scss';


const manageInspectionPage = async (
   { params }: 
   { params: { inspectionID: string }} 
) => {

   const allBeehivesNames: BeehiveName[] = (await getAllBeehiveNamesAndIDs()).documents
   const currentInspection: FullInspection | undefined = params.inspectionID 
      ? (await getFullInspectionByID(params.inspectionID)).document
      : undefined;

   console.log(currentInspection);
   
   

   return (
     <InspectionForm 
      beehiveNames={allBeehivesNames}
      currentinspection={currentInspection}
      >
      
     </InspectionForm>
   );
}

export default manageInspectionPage;