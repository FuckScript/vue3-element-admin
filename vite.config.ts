import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import path from "path";
const pathSrc = path.join(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动导入参考： https://github.com/sxzz/element-plus-best-practices/blob/main/vite.config.ts
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "@vueuse/core"],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [ElementPlusResolver(), IconsResolver({})],
      eslintrc: {
        enabled: false,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
      vueTemplate: true,
      // 配置文件生成位置(false:关闭自动生成)
      dts: false,
      // dts: "src/types/auto-imports.d.ts",
    }),

    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({ enabledCollections: ["ep"] }),
      ],
      // 指定自定义组件位置(默认:src/components)
      dirs: ["src/**/components"],
      // 配置文件位置 (false:关闭自动生成)
      dts: false,
      // dts: "src/types/components.d.ts",
    }),

    Icons({
      autoInstall: true,
    }),

    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
});
