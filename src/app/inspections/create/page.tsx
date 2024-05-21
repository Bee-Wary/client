import { getAllBeehiveNamesAndIDs, getSummerizedBeehiveByID } from '@/services/beehives/queries';
import { getFullInspectionByID } from "@/services/inspections/queries";
import { InspectionForm } from '@/components/inspection/inspectionForm';
import styles from '@/styles/inspections/inspectionsPage.module.scss';


const CreateInspectionPage = async (
   { params, searchParams }: 
   { 
      params: {inspectionID?: string}
      searchParams: { beehiveRefID?: string }
   } 
) => {   
   const allBeehivesNames: BeehiveName[] = (await getAllBeehiveNamesAndIDs()).documents
   const currentBeehiveInfo: SummerizedBeehive | undefined = searchParams.beehiveRefID ?
      (await getSummerizedBeehiveByID(searchParams.beehiveRefID)).documents[0]
      : undefined ;   

   const currentinspection: FullInspection | undefined = params.inspectionID ?
      (await getFullInspectionByID(params.inspectionID)).documents
      : undefined ;      
      
   return (
        <InspectionForm
         beehiveNames={allBeehivesNames}
         connectedBeehive={currentBeehiveInfo}
         currentinspection={currentinspection}
         />
   );
}

export default CreateInspectionPage;