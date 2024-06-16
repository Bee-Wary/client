import { getAllBeehiveNamesAndIDs } from '@/services/server/beehives/queries';
import { SensorsPageForm } from '@/components/sensor/SensorPageForm';
import { getAllStatistics } from '@/services/server/statistics/queries';

const SensorsPage = async ({ params, searchParams }: { params: { inspectionID?: string }; searchParams: { beehiveRefID?: string } }) => {
  const allBeehivesNames: BeehiveName[] = (await getAllBeehiveNamesAndIDs()).documents;
  const allStatistics: StatisticsList[] = (await getAllStatistics()).documents;

  return <SensorsPageForm beehiveNames={allBeehivesNames} StatisticsList={allStatistics} />;
};

export default SensorsPage;
