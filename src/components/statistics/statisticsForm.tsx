'use client';

import { Select, SelectItem } from '@nextui-org/react';

type Props = {
  beehiveNames: BeehiveName[];
};
export const StatiscticsForm = (props: Props) => {
  return (
    <div>
      <h1>Quick Overview</h1>

      <Select placeholder="Select a beehive">
        {props.beehiveNames.map((beehive) => (
          <SelectItem key={beehive._id} value={beehive._id}>
            {beehive.name}
          </SelectItem>
        ))}
      </Select>

      <h3>Toggle Statistics</h3>
    </div>
  );
};
