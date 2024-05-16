'use client';

import { Input } from '@nextui-org/react';
import { X } from '@phosphor-icons/react/dist/ssr';
// A hook makes this component stateful and must be client-side, Server Side Rendering (SSR) is not supported.
import { useState } from 'react';

interface Props {
    labelTitle?: string;
    placeholderText?: string;
    inputValueMinLength?: number;
    value?: string;
    isReadOnly?: boolean;
}


/**
 * Custom styled input field for Bee-Wary.
 * 
 * @param { string } labelTitle - optinal title of the input field.
 * @param { string } placeholderText - optional placeholder text, default = Enter data
 * @param { string } inputValueMinLength - optional minimum length of inputted value, default = 2
 * @param { string } value - optional set value if a value wants to be defined from the start.
 * @param { boolean } isReadOnly - optional if the input is readonly.
 */
export const BwInput = (
    // props are the items passed.
    { props } : 
    { props?: Props}
) => {
    const labelTitle = props?.labelTitle || '';
    const placeholderText = props?.placeholderText || 'Enter data';
    const minimumValueLength = props?.inputValueMinLength || 2;
    const isReadOnly = props?.isReadOnly || false;

    const [isInvalid, setIsInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [value, setValue] = useState(props?.value || '');


    return (
    <>
        <Input 
        className='p-2 pb-0'
        label={labelTitle} 
        placeholder={placeholderText}
        errorMessage={errorMessage}
        endContent={<X />}
        value={value}
        isReadOnly={isReadOnly}

        onValueChange={checkValitidty}

        isClearable
        isInvalid={isInvalid}

        labelPlacement='outside'
        classNames={{
            label: ['text-off-black', 'font-bold', 'text-lg', 'ml-2'],
            inputWrapper: ['rounded','shadow', 'border-r-5', 'bg-petal-white-bright', isInvalid ? 'border-negative-red' : 'border-dusty-green'],
        }}          
        >
            what if here is text
        </Input>
    </>
    );

    function checkValitidty(value: string) {
        setValue(value);
        if (value.length < minimumValueLength && value.length != 0) {
            setIsInvalid(true);
            setErrorMessage(`The value must be at least ${minimumValueLength} characters long.`);
        } else {
            setIsInvalid(false);
            setErrorMessage('');
        }
    };
};