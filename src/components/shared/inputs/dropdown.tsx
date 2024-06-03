'use client';

import {Select, SelectSection, SelectItem} from "@nextui-org/select";
import { useState } from 'react';

enum SelectionModeEnum {
  single = 'single',
  multiple = 'multiple'
}
interface Props {
    labelTitle?: string;
    dropdownItems: Array<{key: string, label: string}>;
    selectedValue?: string;
    selectionMode?: SelectionModeEnum;
}

/**
 * Custom styled dropdow field for Bee-Wary.
 * 
 * @param { string } labelTitle - optinal title of the input field.
 * @param { string } selectionMode - optinal mode if the selection is multiple select or single select.
 */
export const BwDropdown = (
    { props } :
    { props: Props }
) => {
    const labelTitle = props?.labelTitle || '' ;
    const dropdownItems = props.dropdownItems;
    const selectionMode = props.selectionMode || SelectionModeEnum.single;
    
    const [currentValue, setCurrentValue] = useState(props.selectedValue || '');

    return (
      <Select
        label={labelTitle}
        labelPlacement='outside'
        items={dropdownItems}
        placeholder="Select an animal"
        className='mt-2 p-2 pb-0'
        classNames={{
          label: ['text-off-black', 'font-bold', 'text-lg', 'ml-2'],
          mainWrapper: ['rounded','shadow', 'border-r-5', 'border-dusty-green'],
          trigger: ['rounded', 'bg-petal-white-bright',],
          popoverContent: ['rounded', 'bg-petal-white-bright',],

        }}
      >
        {(item) => 
          <SelectItem key={item.key}>
            {item.label}
          </SelectItem>
        }
      </Select>
    );
}