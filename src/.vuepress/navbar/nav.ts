import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  { 
    text: "技术", 
    prefix: "/tech/",
    children: [
      {text: "C大程", link:"c/"},
      {text: "FPGA", link:"fpga/"},
      {text: "一些研究", link:"others/"}
    ]
  },
  {
    text: "随想",
    link: "/life/",
  },
  {
    text: "关于我",
    link: "/about/"
  },
  {
    text: "关于本框架",
    icon: "note",
    link: "https://theme-hope.vuejs.press/",
  },
]);
