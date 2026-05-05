// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config

export default defineConfig({
  site: "https://blog.nope.digital",
  fonts: [
    {
      name: "Chillax",
      cssVariable: "--font-chillax",
      provider: fontProviders.local(),
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            style: "normal",
            weight: "200 700",
            src: ["./src/assets/fonts/Chillax-Variable.ttf"],
            display: "swap",
          },
        ],
      },
    },
    {
      name: "Newsreader",
      cssVariable: "--font-newsreader",
      provider: fontProviders.local(),
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            style: "normal",
            weight: "400",
            src: ["./src/assets/fonts/Newsreader_9pt-Regular.ttf"],
            display: "swap",
          },
          {
            style: "normal",
            weight: "700",
            src: ["./src/assets/fonts/Newsreader_24pt-Bold.ttf"],
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
