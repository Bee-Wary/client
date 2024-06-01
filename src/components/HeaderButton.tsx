import { Button } from "@nextui-org/react";
import inputStyles from '@/styles/inputs/inputs.module.scss'
import Link from "next/link";
import { UrlObject } from "url";
import React, { PropsWithChildren, ReactNode } from "react";

type props = {
    href: string | UrlObject;
    icon: ReactNode;
}

export default function HeaderButton({href, icon, children}: PropsWithChildren<props>) {
    return (
        <Link 
          href={href}>
          <Button 
              className={`${inputStyles.actionButton} p-3`}
              size="lg"
              endContent={icon}
          >
            {children}
          </Button>
        </Link>
    )
}