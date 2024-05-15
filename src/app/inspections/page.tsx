import InspectionDetailButton from '@/components/inspection/inspectionDetailButton';
import Link from 'next/link';

const InsepctionsPage = async () => {
  const inspections = await getInspections();

  return (
    <>
      <p>
        {inspections.map((inspection: any) => (
          <Link key={inspection.id} href={{
            pathname: `inspections/${inspection.id}`,
            query: { inspectionTitle: inspection.inspectionTitle }
            }}>
            <InspectionDetailButton
              inspectionTitle={inspection.inspectionTitle}
              inspectionID={inspection.id}>
            </InspectionDetailButton>
          </Link>
        ))}
      </p>
      <p>InspectionsPage</p>
    </>
  );
}

const getInspections = async () => {
  // TODO: Return real data fetched from an API, preffered via a service in the folder services. 
  // const response = await getAllInspections('');
  // return response.json();
  // -- mock data --
  return [
    {id: "1", inspectionTitle: "first title"},
    {id: "2", inspectionTitle: "second title"}
  ]
}

export default InsepctionsPage;