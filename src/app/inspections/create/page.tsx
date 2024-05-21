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

   // * This Will be querried after a beehive is selected, OR if a beehiveRefID is passed as searchparams.
   // via this we know how many frames there are needed.
   const currentBeehiveInfo: SummerizedBeehive | undefined = searchParams.beehiveRefID ?
      (await getSummerizedBeehiveByID(searchParams.beehiveRefID)).documents
      : undefined ;   

   // * This will be passed if editing a existing inspection ONLY.
   const currentinspection: FullInspection | undefined = params.inspectionID ?
      (await getFullInspectionByID(params.inspectionID)).documents
      : undefined ;  
      
      /*
      ! make the mongo merge query instead?
      * get the currentinspection and merge the frames of the beehive with them, the you can acces the content and have the ID.
      * the current 

      pass the beehive frames to get the IDs of the frames to compare to the ref_frame from the inspections.
      frames are optional, they can later be queried by selecting a beehive.
      pass the beehive names with IDs for the dropdown.
            query the frames of a beehive
            find the current selected beehive to connect it, this is used to to trigger the suspense and have the frame data (to fill)
            the connected beehive will populate the frames
            correlate the beehive frame IDs to the connectedbeehive ref_frame and generate sliders with that data.
      put sections: frames and Mitigations in suspense, load these when the connected beehive is not-null/filled.
      build the POST object corresponding to a BaseFullInspection
      
      fix carousel.
      */
      
   return (
        <InspectionForm
         beehiveNames={allBeehivesNames}
         connectedBeehive={currentBeehiveInfo}
         currentinspection={currentinspection}
         />
   );
}

export default CreateInspectionPage;