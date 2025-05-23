import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: "category",
      label: "Home",
      link: {
        type: "doc",
        id: "index",
      },
      items: [], // Added empty items array to satisfy the required schema
    },
    {
      type: "category",
      label: "Quick Start",
      link: {
        type: "doc",
        id: "quick-start/index",
      },
      items: [{ type: "autogenerated", dirName: "quick-start" }],
      collapsible: true,
      collapsed: true,
    },
    {
      type: "html",
      value: '<hr class="category-title-hr"/>',
      defaultStyle: true,
    },
    {
      type: "category",
      label: "Account",
      link: {
        type: "doc",
        id: "account/index",
      },
      items: [{ type: "autogenerated", dirName: "account" }],
      collapsible: true,
      collapsed: true,
    },
    {
      type: "category",
      label: "Market Data",
      link: {
        type: "doc",
        id: "market-data/index",
      },
      items: [{ type: "autogenerated", dirName: "market-data" }],
      collapsible: true,
      collapsed: true,
    },
    {
      type: "html",
      value:
        '<hr class="category-title-hr titled"/><div class="category-title">Trading</div>',
      defaultStyle: true,
    },
    {
      type: "category",
      label: "DCA Bot",
      link: {
        type: "doc",
        id: "dca-bot/index",
      },
      items: [{ type: "autogenerated", dirName: "dca-bot" }],
      collapsible: true,
      collapsed: true,
    },
    {
      type: "category",
      label: "Grid Bot",
      link: {
        type: "doc",
        id: "grid-bot/index",
      },
      items: [{ type: "autogenerated", dirName: "grid-bot" }],
      collapsible: true,
      collapsed: true,
    },
    {
      type: "category",
      label: "Smart Trade",
      link: {
        type: "doc",
        id: "smart-trade/smart-trade",
      },
      items: [{ type: "autogenerated", dirName: "smart-trade" }],
      collapsible: true,
      collapsed: true,
    },
    {
      type: "html",
      value: '<hr class="category-title-hr"/>',
      defaultStyle: true,
    },
    {
      type: "category",
      label: "Search",
      link: {
        type: "doc",
        id: "search/search",
      },
      items: [{ type: "autogenerated", dirName: "search" }],
      collapsible: true,
      collapsed: true,
    },
  ],
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
