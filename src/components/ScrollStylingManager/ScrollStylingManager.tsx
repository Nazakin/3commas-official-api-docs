import React, { useEffect } from "react";

const ScrollStylingManager = () => {
  useEffect(() => {
    const excludedRoutes = [
      "/account/",
      "/account/account-entity",
      "/dca-bot",
      "/dca-bot/deals/",
      "/dca-bot/dca-bot-entity",
      "/dca-bot/deals/deal-entity",
      "/general-information",
      "/general-information/dates-and-times",
      "/general-information/errors",
      "/general-information/get-an-api-key",
      "/general-information/how-to-create-an-rsa-key-pair",
      "/general-information/how-to-start",
      "/general-information/overview",
      "/general-information/limits",
      "/general-information/security-and-permission-types",
      "/general-information/signing-a-request-using-hmac-sha256",
      "/general-information/signing-a-request-using-rsa",
      "/grid-bot",
      "/grid-bot/grid-bot-entity",
      "/market-data",
      "/smart-trade/",
      "/smart-trade/smart-trade-entity",
      "/smart-trade/trades/trade-entity",
    ];
    const isLimitRoute = ["/general-information/limits", "/general-information/errors",];

    const handleScroll = () => {
      const isExcluded = excludedRoutes.includes(window.location.pathname);
      const isPlaceholderRoute = isLimitRoute.includes((window.location.pathname))
      const breadcrumbs = document.querySelector(".breadcrumbsContainer_Ar0W");
      const container = document.querySelector(".container_eK_a");
      const h1 = document.querySelector(".theme-doc-markdown header h1");
      const header = document.querySelector(".theme-doc-markdown header");

      if (window.scrollY >= 140) {
        if (isPlaceholderRoute) {
          let placeholder = document.querySelector(
            ".placeholder",
          ) as HTMLElement;
          if (!placeholder) {
            placeholder = document.createElement("div");
            placeholder.className = "placeholder";
            placeholder.style.height = "60px";
            header.appendChild(placeholder);
          }
        }
        if (breadcrumbs) breadcrumbs.classList.add("scrolledClass");
        if (h1) {
          if (isExcluded) {
            h1.classList.add("scrolledClassMain");
            h1.classList.remove("scrolledClass");
          } else {
            h1.classList.add("scrolledClass");
            h1.classList.remove("scrolledClassMain");
          }
        }
        if (!isExcluded && container) {
          container.classList.add("scrolledClass");
        }
      } else {
        if (isPlaceholderRoute) {
          const placeholder = document.querySelector(".placeholder");
          if (placeholder) {
            placeholder.parentElement.removeChild(placeholder);
          }
        }
        if (breadcrumbs) breadcrumbs.classList.remove("scrolledClass");
        if (h1) {
          h1.classList.remove("scrolledClass");
          h1.classList.remove("scrolledClassMain");
        }
        if (container) container.classList.remove("scrolledClass");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
};

export default ScrollStylingManager;
