import React from "react";
import { BwInput } from "@/components/shared/inputs/input";
import { BwDatePicker } from "@/components/shared/inputs/datePicker";

/**
 * Show the details page of the inspection with the given id.
 * 
 * @param {Object} params - The params given from the dynamic routing like [id].
 * @param {Object} searchParams - the query values from the URL.
 */
const InspectionDetailPage = (
   {params, searchParams} : {
      params: { id: string }, 
      searchParams?: { inspectionTitle?: string; }
   }) => {
   const inspectionId = params.id;
   const inspectionTitle = searchParams?.inspectionTitle || '';


   return (
     <>
         <p>InspectionDetailPage {inspectionId}</p>

         <BwInput props={{ labelTitle: inspectionTitle }}></BwInput>
         <BwDatePicker></BwDatePicker>


     </>
   );
}

export default InspectionDetailPage;