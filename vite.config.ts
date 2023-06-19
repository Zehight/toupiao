import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import * as path from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { Vuetify3Resolver } from 'unplugin-vue-components/resolvers'

const projectRootDir = path.resolve(__dirname)


const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    envDir: path.resolve(projectRootDir, 'env'),
    base: '/', // 二级目录
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(projectRootDir, 'src'),
        },
      ],
    },
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: [
          'vue',
          'vue-router',
          {
            '@vueuse/core': [
              'useMouse',
              ['useFetch', 'useMyFetch']
            ],
            axios: [
              ['default', 'axios']
            ]
          }
        ],
        resolvers: [
          Vuetify3Resolver(),
          // 自动导入图标组件
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),
      Components({
        dirs: ['src/components', 'src/assets', 'src/modules'],
        resolvers: [
          // 自动注册图标组件
          Vuetify3Resolver(),
        ],
        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),
    ],
    css: {
      /* CSS 预处理器 */
      preprocessorOptions: {
        scss: {
          additionalData: '$injectedColor: orange;'
        }
      }
    }
  })
}
