// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config

export default defineConfig({
  integrations: [mdx(), icon()],
  site: "https://blog.nope.digital",
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
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
