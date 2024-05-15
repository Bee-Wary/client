'use client';

import { DateInput } from '@nextui-org/react';
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { CalendarDots  } from '@phosphor-icons/react/dist/ssr';
// A hook makes this component stateful and must be client-side, Server Side Rendering (SSR) is not supported.
import { useState } from 'react';

interface props {
    labelTitle?: string;
}

/**
 * Custom styled date input field for Bee-Wary.
 * 
 * @param { string } labelTitle - optinal title of the input field.
 *
 */
export const BwDatePicker = (
    // props are the items passed.
    { props } : 
    { props?: props}
) => {
    const labelTitle = props?.labelTitle || 'Date' ;
    
    const [value, setValue] = useState(today(getLocalTimeZone()));
    const [isInvalid, setIsInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <DateInput 
            granularity='day'
            className='p-2 pb-0'
            label={labelTitle} 
            defaultValue={today(getLocalTimeZone())}
            value={value}
            errorMessage={isInvalid ? errorMessage : ''}
            endContent={<CalendarDots  />}

            isInvalid={isInvalid}
            onChange={setValue}
            onBlur={checkValitidty}

            labelPlacement='outside'
            classNames={{
                label: ['text-off-black', 'font-bold', 'text-lg', 'ml-2'],
                inputWrapper: ['rounded','shadow', 'border-r-5', isInvalid ? 'border-negative-red' : 'border-dusty-green'],
            }}     
        >
        </DateInput>
    );

    function checkValitidty() {
        if (value > today(getLocalTimeZone())) {
            setIsInvalid(true);
            setErrorMessage(`The date is in the future.`);
        } else {
            setIsInvalid(false);
            setErrorMessage('');
        }
    };

    function toStringDateOnly(date : Date) {
        return (date.getFullYear() + '-' + date.getDay() + '-' + date.getMonth())
    }
}