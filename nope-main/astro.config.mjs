import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://nope.digital",
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
      name: "ZT Nature",
      cssVariable: "--font-zt-nature",
      provider: fontProviders.local(),
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            style: "normal",
            weight: "100 900",
            src: ["./src/assets/fonts/ZT Nature Variable-VF.ttf"],
            display: "block",
          },
        ],
      },
    },
  ],
});
