import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://nope.digital",
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
      fs: {
        allow: [".."],
      },
    },
  },
  fonts: [
    {
      name: "Literata",
      cssVariable: "--font-literata",
      provider: fontProviders.local(),
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            style: "normal",
            weight: "400",
            src: ["../packages/fonts/Literata-Regular.woff2"],
            display: "swap",
          },
          {
            style: "italic",
            weight: "400",
            src: ["../packages/fonts/Literata-Italic.woff2"],
            display: "swap",
          },
          {
            style: "normal",
            weight: "700",
            src: ["../packages/fonts/Literata-Bold.woff2"],
            display: "swap",
          },
        ],
      },
    },
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
            src: ["../packages/fonts/ZT Nature Variable-VF.woff2"],
            display: "swap",
          },
        ],
      },
    },
  ],
});
