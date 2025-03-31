import React from 'react';
import {SidebarProvider} from "@site/src/context/SidebarContext";

export function rootContainer({children}: {children: React.ReactNode}) {
    console.log('SidebarProvider clientModule is LOADED!');
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    );
}