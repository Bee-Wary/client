"use client";

import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";

export function Providers(
  { children }: 
  { children: React.ReactNode }
) {
  const [isClient, setIsClient] = useState(false);
  // Workaround for hydration errors. https://github.com/nextui-org/nextui/issues/2073
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    isClient ?
    <NextUIProvider>
      <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
          {children}
      </div> 
    </NextUIProvider>
    : 
    <></>
  );

  // return (
  //   <NextUIProvider>
  //     {children}
  //   </NextUIProvider>
  // );
}