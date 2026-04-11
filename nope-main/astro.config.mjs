import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [mdx()],
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
});
