// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";

// https://astro.build/config

export default defineConfig({
  integrations: [mdx()],
  fonts: [
    {
      name: "Jost",
      cssVariable: "--font-jost",
      provider: fontProviders.local(),
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            style: "normal",
            weight: "100 900",
            src: ["./src/assets/fonts/Jost-VariableFont_wght.ttf"],
            display: "swap",
          },
        ],
      },
    },
  ],
  vite: {
    build: {
      // The gallery intentionally loads a large async `three` vendor chunk.
      chunkSizeWarningLimit: 750,
    },
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
});
