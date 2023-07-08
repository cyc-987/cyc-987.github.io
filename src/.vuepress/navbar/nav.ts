import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  { 
    text: "技术", 
    prefix: "/tech/",
    children: [
      {text: "编程寄术", link:"code/"},
      {text: "其他技术", link:"others/"}
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
