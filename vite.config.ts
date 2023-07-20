import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode, ssrBuild }) => {
  console.log("Current Command: ", command);
  console.log("Current Mode: ", mode);
  console.log("SSRBuild Switch: ", ssrBuild);

  const env = loadEnv(mode, process.cwd(), "");

  console.log("Vite My Key: ", env.VITE_MY_KEY);

  return {
    base: env.VITE_BASE_URL,
    server: {
      host: "0.0.0.0",
      port: 3000,
      proxy: {},
    },
    plugins: [
      react(),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
    ],
  };
});
