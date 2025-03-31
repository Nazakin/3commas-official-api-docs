import React, { useRef } from 'react';
import {useSidebarContext} from "@site/src/context/SidebarContext";

import styles from './SidebarButton.module.css'
import {SidebarButtonIcon} from "@site/src/icons/SidebarButtonIcon";

export default function SidebarButton() {
    const {
        isOpen,
        isPinned,
        openSidebarAbsolute,
        togglePin,
        scheduleClose,
        cancelScheduledClose,
    } = useSidebarContext();

    const handleMouseEnter = () => {
        cancelScheduledClose()
        if (!isPinned && !isOpen) {
            openSidebarAbsolute();
        }
    };

    const handleMouseLeave = () => {
        if (!isPinned) {
            scheduleClose(500);
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
            className={styles.sidebarOpenButton}
        >
            <SidebarButtonIcon/>
        </button>
    );
}