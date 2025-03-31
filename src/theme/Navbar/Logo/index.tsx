import React from 'react';
import Logo from '@theme/Logo';
import SidebarButton from "@site/src/components/SidebarButton/SidebarButton";

export default function NavbarLogo(): JSX.Element {
  return (
      <div className="navbar__left__content">
    <Logo
      className="navbar__brand"
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
         <SidebarButton/>
       </div>
  );
}
