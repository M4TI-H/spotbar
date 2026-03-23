import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  css: ["~/assets/style.css"],
  vite: {
    //@ts-ignore
    plugins: [tailwindcss()],
  },
  primevue: {
    options: {
      unstyled: true,
    },
  },
  components: true,
});
