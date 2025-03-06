import React from 'react';
import clsx from 'clsx';
import type SidebarType from '@theme/DocRoot/Layout/Sidebar';
import Sidebar from '@theme-original/DocRoot/Layout/Sidebar';
import type {WrapperProps} from '@docusaurus/types';

import { useSidebarContext } from '@site/src/context/SidebarContext';
import SidebarHoverZone from '@site/src/components/SidebarHoverZone/SidebarHoverZone';

// Імпорт CSS-модуля
import styles from './styles.module.css';

type Props = WrapperProps<typeof SidebarType>;

export default function SidebarWrapper(props: Props): JSX.Element {
    const {
        isOpen,
        isPinned,
        scheduleClose,
        cancelScheduledClose
    } = useSidebarContext();

    const handleMouseEnter = () => {
        cancelScheduledClose();
    };
const windowWidth = window.innerWidth
    const handleMouseLeave = () => {
        if (!isPinned) {
            scheduleClose(500);
        }
    };

    return (
        <>
            {(!isOpen && !isPinned) && <SidebarHoverZone />}

            <div
                className={clsx(
                    styles.sidebarBase,
                    isPinned ? styles.sidebarPinned : styles.sidebarUnpinned,
                    isOpen ? styles.sidebarOpen : styles.sidebarClosed
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {isOpen && <Sidebar {...props} />}
            </div>
        </>
    );
}