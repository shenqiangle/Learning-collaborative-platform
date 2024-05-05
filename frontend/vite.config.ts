import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tagName) => {
            return (
              tagName === "vue-advanced-chat" || tagName === "emoji-picker"
            );
          },
        },
      },
    }),
    vueJsx(),
    vueSetupExtend(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    }
  },
  server:{
    proxy:{
      // 使用 proxy 实例
      '/api': {
        target: 'http://127.0.0.1:3000',
        // target: 'http://127.0.0.1:4523/m1/4021774-0-default',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
    
    
  }
})
