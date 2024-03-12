import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, {resolve} from "path";
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({rollupTypes:true})],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/lib.ts"),
      name: 'VuelCalendar',
      fileName: (format) => format === 'es' ? `vuel-calendar.js` :`vuel-calendar.cjs`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
