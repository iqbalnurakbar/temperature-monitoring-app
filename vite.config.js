import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/temperature-monitoring-app",
  plugins: [
    react(),
    VitePWA({
      manifest: {
        // Konfigurasi manifest.json
        name: "Monitoring Suhu",
        short_name: "MonSu",
        description: "Monitoring Suhu pada Mesin Ball Tea",
        start_url: "/temperature-monitoring-app",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
      },
    }),
  ],
});
