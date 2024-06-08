import { PropsWithChildren } from "react";

export default function NavMenuContainer({ children }: PropsWithChildren) {
    return (
        <div className='flex flex-col gap-3 border-t-1 border-pineapple-yellow pt-2 pb-8'>
            {children}
        </div>
    )
}