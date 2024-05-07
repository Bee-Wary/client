import styles from '@/styles/Inspections.module.scss';
import InspectionDetailButton from '@/components/inspection/inspectionDetailButton';
import Link from 'next/link';


const getInspections = async () => {
  // TODO: Return real data fetched from an API. 
  // const response = await fetch('');
  // return response.json();
  // -- mock data --
  return [
    {id: "1", title: "title"},
    {id: "2", title: "name"}
  ]
}

const InsepctionsPage = async ({...props}) => {

  const inspections = await getInspections();

  return (
    <>
      <p>
        {inspections.map((inspection: any) => (
          <Link key={inspection.id} href={`inspections/${inspection.id}`}>
            <InspectionDetailButton
              inspectionTitle={inspection.title}
              inspectionID={inspection.id}>
            </InspectionDetailButton>
          </Link>
        ))}
      </p>
      {props.children}
    </>
  );
}

export default InsepctionsPage;