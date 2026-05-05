import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://nope.digital",
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  },
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
        ],
      },
    },
  ],
});
