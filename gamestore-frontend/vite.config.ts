import {defineConfig, PluginOption} from "vite";
import {visualizer} from "rollup-plugin-visualizer";
import react from "@vitejs/plugin-react";
import eslint from "@rollup/plugin-eslint";
import path from "path"


export default defineConfig({
  plugins: [
    react(),
    {
      ...eslint(
        {
          include: "src/**/*.+(js|jxs|ts|tsx)",
        },
      ),
      enforce: "pre",
    },
    
    visualizer({gzipSize: true, open: true}) as PluginOption,
  ],
  resolve: {
    alias: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
  },
})
