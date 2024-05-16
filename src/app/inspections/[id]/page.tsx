import React from "react";
import { BwInput } from "@/components/shared/inputs/input";
import { BwDatePicker } from "@/components/shared/inputs/datePicker";
import { BwDropdown } from "@/components/shared/inputs/dropdown";

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
         <BwDropdown props={{
            dropdownItems : [{ key: "1", label: "Dummy 1"}, { key: "2", label: "Dummy 2"}], 
            selectedValue: "heeloz",
            labelTitle: 'dropdown'
         }}>  
         </BwDropdown>
     </>
   );
}

export default InspectionDetailPage;