// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config

export default defineConfig({
  site: "https://blog.nope.digital",
  fonts: [
    {
      name: "Nature",
      cssVariable: "--font-nature",
      provider: fontProviders.local(),
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            style: "normal",
            weight: "100 900",
            src: ["./src/assets/fonts/ZT Nature Variable-VF.ttf"],
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
