import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro"; 
import theme from "./theme.js";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "cyc's notebook",
  description: "一个个人博客，实际上是笔记本",

  theme,



  // Enable it with pwa
  // shouldPrefetch: false,

  plugins:[
    searchProPlugin({
      //索引全部内容
      indexContent: true,
    }),
    autoCatalogPlugin({
      //插件选项
    }),
  ]
});
