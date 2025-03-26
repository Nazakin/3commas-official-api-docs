import React, { useRef } from 'react';
import {useSidebarContext} from "@site/src/context/SidebarContext";

import styles from './SidebarButton.module.css'
import {SidebarButtonIcon} from "@site/src/icons/SidebarButtonIcon";
import clsx from "clsx";
import {SidebarButtonIconActive} from "@site/src/icons/SidebarButtonIconActive";

export default function SidebarButton() {
    const {
        isOpen,
        isPinned,
        openSidebarAbsolute,
        togglePin,
        scheduleClose,
    } = useSidebarContext();

    const handleMouseEnter = () => {
        if (!isPinned && !isOpen) {
            openSidebarAbsolute();
        }
    };

    const handleMouseLeave = () => {
        if (!isPinned) {
            scheduleClose(200);
        }
    };

    const handleClick = () => {
        togglePin();
    };

    return (
        <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={clsx(
                styles.sidebarOpenButton,
            )}
        >
            {isPinned ? <SidebarButtonIconActive/> :<SidebarButtonIcon/>}
        </button>
    );
}