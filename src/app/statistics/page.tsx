import { Select, SelectItem } from '@nextui-org/react';
import { getAllBeehiveNamesAndIDs } from '@/services/server/beehives/queries';
import { StatiscticsForm } from '@/components/statistics/statisticsForm';

const Statisticspage = async ({ params, searchParams }: { params: { inspectionID?: string }; searchParams: { beehiveRefID?: string } }) => {
  const allBeehivesNames: BeehiveName[] = (await getAllBeehiveNamesAndIDs()).documents;
  // const allstatistics: Statistics[] = (await getAllStatistics()).documents;

  return <StatiscticsForm beehiveNames={allBeehivesNames} />;
};

export default Statisticspage;
