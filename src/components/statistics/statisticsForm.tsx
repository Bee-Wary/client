'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { Drop, Thermometer } from '@phosphor-icons/react/dist/ssr';
import style from '@/styles/statistics/statisticPage.module.scss';
import { SetStateAction, useState, useEffect, useMemo } from 'react';
import ChartsEmbedSDK, { Chart } from '@mongodb-js/charts-embed-dom';

type Props = {
  beehiveNames: BeehiveName[];
  StatisticsList: StatisticsList[];
};

const chartIdMapping = {
  temperature: {
    '1 Month': '66587e67-39a7-461c-8e57-083741d5d42a',
    '3 Months': '51e20191-ab8a-45d1-b00c-b7fddd4e4666',
    '6 Months': 'bfd3d084-8e32-4ba5-873c-5d537dd439c5',
    '1 Year': 'dfb503e1-885d-4638-b314-26465e266b2e',
  },
  humidity: {
    '1 Month': '6658b44b-39a7-47c0-873d-083741db8e38',
    '3 Months': 'e4d1ecc8-05b3-4b97-b4df-fc46768746e9',
    '6 Months': 'fd89f3da-b209-4d53-8434-295378d7a8e9',
    '1 Year': '7234f9fc-2586-4ad8-9590-535e3d8bfa1d',
  },
};

const timePeriods = ['1 Month', '3 Months', '6 Months', '1 Year'];

const sdk = new ChartsEmbedSDK({
  baseUrl: 'https://charts.mongodb.com/charts-thomas-more-ndtmfzm',
});

export const StatisticsForm = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTimeIndex, setActiveTimeIndex] = useState(0);
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    const selectedStatistic: 'temperature' | 'humidity' = props.StatisticsList[activeIndex].metadata.type as 'temperature' | 'humidity';
    const selectedTimePeriod: '1 Month' | '3 Months' | '6 Months' | '1 Year' = timePeriods[activeTimeIndex] as '1 Month' | '3 Months' | '6 Months' | '1 Year';
    const chartId = chartIdMapping[selectedStatistic][selectedTimePeriod];

    const newChart = sdk.createChart({
      chartId,
    });

    const chartElement = document.getElementById('chart');
    if (chartElement) {
      newChart.render(chartElement).catch(() => window.alert('Chart failed to initialise'));
    } else {
      console.error('Element with id "chart" not found');
    }

    setChart(newChart);
  }, [activeIndex, activeTimeIndex, props.StatisticsList]);

  const handleItemClick = (index: SetStateAction<number>) => {
    setActiveIndex(index);
  };

  const handleTimeToggleClick = (index: SetStateAction<number>) => {
    setActiveTimeIndex(index);
  };

  return (
    <div className={style.StatisticPage}>
      <h1 className={style.StatisticPageTitle}>Quick overview</h1>
      <Select placeholder="Select a beehive">
        {props.beehiveNames.map((beehive) => (
          <SelectItem key={beehive._id} value={beehive._id}>
            {beehive.name}
          </SelectItem>
        ))}
      </Select>

      <h3 className={style.StatisticPageSubTitle}>Toggle Statistics</h3>
      <div className={style.StatisticList}>
        {props.StatisticsList.map((statistic, index) => (
          <div key={statistic._id} className={style.StatisticItem}>
            <div className={`${style.StatisticIcon} ${index === activeIndex ? style.active : ''}`} onClick={() => handleItemClick(index)}>
              {statistic.metadata.type === 'temperature' ? <Thermometer size={47} className={style.StatisticSVG} /> : <Drop size={47} className={style.StatisticSVG} />}
            </div>
            <p className={style.StatisticName}>{statistic.metadata.type}</p>
          </div>
        ))}
      </div>
      <div>
        <div className={style.StatisticTimeToggle}>
          {timePeriods.map((period, index) => (
            <div key={index} className={`${style.StatisticTimeToggleItem} ${index === activeTimeIndex ? style.active : ''}`} onClick={() => handleTimeToggleClick(index)}>
              <p className={style.StatisticTimeToggleItemText}>{period}</p>
            </div>
          ))}
        </div>
        <div id="chart" className={style.StatisticChart}></div>
      </div>
    </div>
  );
};
