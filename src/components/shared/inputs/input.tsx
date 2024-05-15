'use client';

import { Input } from '@nextui-org/react';
import { X } from '@phosphor-icons/react/dist/ssr';
// A hook makes this component stateful and must be client-side, Server Side Rendering (SSR) is not supported.
import { useState } from 'react';

interface props {
    labelTitle?: string;
    placeholderText?: string;
    inputValueMinLength?: number;
}


/**
 * Custom styled input field for Bee-Wary.
 * 
 * @param { string } labelTitle - optinal title of the input field.
 * @param { string } placeholderText - optional placeholder text, default = Enter data
 * @param { string } inputValueMinLength - optional minimum length of inputted value, default = 2
 */
export const BwInput = (
    // props are the items passed.
    { props } : 
    { props?: props}
) => {
    const labelTitle = props?.labelTitle || '';
    const placeholderText = props?.placeholderText || 'Enter data';
    const minimumValueLength = props?.inputValueMinLength || 2;

    const [isInvalid, setIsInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    return (
    <>
        <Input 
        className='p-2 pb-0'
        label={labelTitle} 
        placeholder={placeholderText}
        errorMessage={errorMessage}
        endContent={<X />}

        onValueChange={checkValitidty}

        isClearable
        isInvalid={isInvalid}

        labelPlacement='outside'
        classNames={{
            label: ['text-off-black', 'font-bold', 'text-lg', 'ml-2'],
            inputWrapper: ['rounded','shadow', 'border-r-5', isInvalid ? 'border-negative-red' : 'border-dusty-green'],
        }}          
        >
            what if here is text
        </Input>
    </>
    );

    function checkValitidty(value: string) {
        if (value.length < minimumValueLength && value.length != 0) {
            setIsInvalid(true);
            setErrorMessage(`The value must be at least ${minimumValueLength} characters long.`);
        } else {
            setIsInvalid(false);
            setErrorMessage('');
        }
    };
};