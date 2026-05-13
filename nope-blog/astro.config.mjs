// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config

export default defineConfig({
  site: "https://blog.nope.digital",
  fonts: [
    {
      name: "ZT Nature",
      cssVariable: "--font-zt-nature",
      provider: fontProviders.local(),
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            style: "normal",
            weight: "100 900",
            src: ["./src/assets/fonts/ZT Nature Variable-VF.woff2"],
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
