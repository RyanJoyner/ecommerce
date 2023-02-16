import { staticAdapter } from '@builder.io/qwik-city/adapters/static/vite';
import { extendConfig, qwikCity } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["@qwik-city-plan"],
      },
    },
    plugins: [
      qwikCity({ basePathname: "/portfolio/" }),
      staticAdapter({
        origin: "https://ryanjoyner.github.io/",
      }),
    ],
  };
});
