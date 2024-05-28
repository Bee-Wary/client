'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { Hexagon, Drop, Thermometer } from '@phosphor-icons/react/dist/ssr';
import style from '@/styles/statistics/statisticPage.module.scss';
import { SetStateAction, useState } from 'react';

type Props = {
  beehiveNames: BeehiveName[];
  StatisticsList: StatisticsList[];
};
export const StatiscticsForm = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTimeIndex, setActiveTimeIndex] = useState(0);

  const handleItemClick = (index: SetStateAction<number>) => {
    setActiveIndex(index);
  };

  const handleTimeToggleClick = (index: SetStateAction<number>) => {
    setActiveTimeIndex(index);
  };

  const timePeriods = ['1 Month', '3 Months', '6 Months', '1 Year'];

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
      </div>
    </div>
  );
};
