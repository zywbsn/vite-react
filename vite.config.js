import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// const ViteEnv = import.meta.env;
// console.log("ViteEnv", ViteEnv);

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, ssrBuild }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log(env);
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true, //开启代理
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  };
});
