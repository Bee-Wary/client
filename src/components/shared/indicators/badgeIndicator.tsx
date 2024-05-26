import { Children, ReactNode } from 'react';
import { IconProps } from "@phosphor-icons/react";
import Link from 'next/link';
import style from '@/styles/indicators/badgeIndicator.module.scss';

interface Props{
    isNegative?: boolean;
    // routeSectionID if you want to scroll to a specific section on the page defined by an id (#).
    route?: { pathname: string, routeSectionID?: string };
    children?: React.ReactElement<IconProps> | ReactNode | string;

}

const BadgeIndicator = (
    { isNegative, route, children }: Props
) => {    
    
    return (
        <>
        {/* Conditional when a pathname is provided it is a link. */}
        {route ?
        <Link href={{
            pathname: route.pathname,
            hash: route.routeSectionID
        }}>
            <div className={`${style.indicator} ${isNegative ? style.negative : style.positive}`}>
                {children}
            </div>
        </Link>
        :
        <div className={`${style.indicator} ${isNegative ? style.negative : style.positive}`}>
            {children}
        </div>
        }
        </>
    );
}

export default BadgeIndicator;