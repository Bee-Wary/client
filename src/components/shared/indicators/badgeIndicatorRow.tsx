import { ReactNode } from 'react';
import style from '@/styles/indicators/badgeIndicatorRow.module.scss';

const BadgeIndicatorRow = ( 
    {children} : 
    {children: ReactNode} 
) => {

    return (
        <div className={style.badgeRow}>
            {children}
        </div>
    );
}

export default BadgeIndicatorRow;