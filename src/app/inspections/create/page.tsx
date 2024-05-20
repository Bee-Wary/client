import { getAllBeehiveNamesAndIDs, getSummerizedBeehiveByID } from '@/services/beehives/queries';
import { getFullInspectionByID } from "@/services/inspections/queries";
import { InspectionForm } from '@/components/inspection/inspectionForm';
import styles from '@/styles/inspections/inspectionsPage.module.scss';


const CreateInspectionPage = async (
   { searchParams }: 
   { searchParams: { beehiveRefID?: string }} 
) => {   
   const allBeehivesNames: BeehiveName[] = (await getAllBeehiveNamesAndIDs()).documents
      // TODO: Finish query single beehive by ID, then pass it to the form component. 
   const currentBeehiveInfo: SummerizedBeehive | undefined = searchParams.beehiveRefID ?
      (await getSummerizedBeehiveByID(searchParams.beehiveRefID)).document
      : undefined ;   

   return (
        <InspectionForm
         beehiveNames={allBeehivesNames}
         connectedBeehive={currentBeehiveInfo}
         currentinspection={undefined}
         />
   );
}

export default CreateInspectionPage;