import React, { useRef } from 'react';
import {useSidebarContext} from "@site/src/context/SidebarContext";

import styles from './SidebarButton.module.css'
import {SidebarButtonIcon} from "@site/src/icons/SidebarButtonIcon";
import clsx from "clsx";

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
                isPinned && styles.sidebarOpenButtonPinned
            )}
        >
            <SidebarButtonIcon/>
        </button>
    );
}