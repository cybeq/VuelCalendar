// vite.config.ts
import { defineConfig } from "file:///C:/Users/mat/Desktop/components/VuelCalendar/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/mat/Desktop/components/VuelCalendar/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import dts from "file:///C:/Users/mat/Desktop/components/VuelCalendar/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\mat\\Desktop\\components\\VuelCalendar";
var vite_config_default = defineConfig({
  plugins: [vue(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/lib/lib.ts"),
      name: "VuelCalendar",
      fileName: (format) => format === "es" ? `vuel-calendar.js` : `vuel-calendar.cjs`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYXRcXFxcRGVza3RvcFxcXFxjb21wb25lbnRzXFxcXFZ1ZWxDYWxlbmRhclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbWF0XFxcXERlc2t0b3BcXFxcY29tcG9uZW50c1xcXFxWdWVsQ2FsZW5kYXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21hdC9EZXNrdG9wL2NvbXBvbmVudHMvVnVlbENhbGVuZGFyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBwYXRoLCB7cmVzb2x2ZX0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFt2dWUoKSwgZHRzKHtyb2xsdXBUeXBlczp0cnVlfSldLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9saWIvbGliLnRzXCIpLFxyXG4gICAgICBuYW1lOiAnVnVlbENhbGVuZGFyJyxcclxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGZvcm1hdCA9PT0gJ2VzJyA/IGB2dWVsLWNhbGVuZGFyLmpzYCA6YHZ1ZWwtY2FsZW5kYXIuY2pzYFxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgZXh0ZXJuYWw6IFsndnVlJ10sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgIHZ1ZTogJ1Z1ZSdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1UsU0FBUyxvQkFBb0I7QUFDL1YsT0FBTyxTQUFTO0FBQ2hCLFNBQWMsZUFBYztBQUM1QixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUMsYUFBWSxLQUFJLENBQUMsQ0FBQztBQUFBLEVBQ3hDLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUMxQyxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVyxXQUFXLE9BQU8scUJBQW9CO0FBQUEsSUFDOUQ7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
