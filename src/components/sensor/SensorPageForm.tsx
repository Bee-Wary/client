'use client';
import style from '@/styles/sensors/sensorPage.module.scss';
import { Button } from '@nextui-org/react';
import { Drop, Thermometer, Ear, ForkKnife, HandbagSimple } from '@phosphor-icons/react/dist/ssr';

type Props = {
  beehiveNames: BeehiveName[];
  StatisticsList: StatisticsList[];
};

const otherSensors = ['Weight', 'Sound', 'Food'];

export const SensorsPageForm = (props: Props) => {
  return (
    <div className={style.SensorsPage}>
      <h1 className={style.SensorsPageTitle}>Quick overview</h1>
      {props.beehiveNames.map((beehive) => (
        <div key={beehive._id} className={style.SensorsListCard}>
          <p className={style.SensorsListCardTitle}>{beehive.name}</p>
          <p className={style.SensorsListCardUndertitle}>Current active sensors:</p>
          <div className={style.SensorListCardItems}>
            {props.StatisticsList.map((statistic) => (
              <div key={statistic._id} className={style.SensorsListCardItem}>
                <p className={style.SensorsListCardItemTitle}>{statistic.metadata.type}:</p>
                <div className={style.SensorListCardItemGroup}>
                  <p className={style.SensorsListCardItemIcon}>{statistic.metadata.type === 'temperature' ? <Thermometer size={47} className={style.StatisticSVG} /> : <Drop size={47} className={style.StatisticSVG} />}</p>
                  <p className={style.SensorsListCardItemText}>{statistic.metadata.type === 'temperature' ? '20°C' : '30%'}</p>
                </div>
              </div>
            ))}
            {otherSensors.map((sensor) => (
              <div key={sensor} className={style.SensorsListCardItemNotActive}>
                <p className={style.SensorsListCardItemTitle}>{sensor}:</p>
                <div className={style.SensorListCardItemGroup}>
                  <p className={style.SensorsListCardItemIcon}>
                    {sensor === 'Sound' ? <Ear size={47} className={style.StatisticSVG} /> : sensor === 'Food' ? <ForkKnife size={47} className={style.StatisticSVG} /> : <HandbagSimple size={47} className={style.StatisticSVG} />}
                  </p>
                  <p className={style.SensorsListCardItemText}>--</p>
                </div>
              </div>
            ))}
          </div>
          <div className={style.SensorsListCardButtons}>
            <a className={style.SensorsListCardButton}>Add Sensor</a>
            <a className={style.SensorsListCardButton} href="sensors/buy">
              Buy Sensors
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
