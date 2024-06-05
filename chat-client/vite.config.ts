import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	//开发或生产环境服务的公共基础路径
	base: './',
	//需要用到的插件数组
	plugins: [vue()],
	envDir: process.cwd(),
	build: {
		//指定输出路径
		outDir: 'dist',
		//指定生成静态资源的存放路径
		assetsDir: 'assets',
		// CSS 代码拆分
		cssCodeSplit: true,
		//构建后是否生成 source map 文件
		sourcemap: false,
		//指定使用哪种混淆器
		minify: 'terser',
		//小于此阈值的导入或引用资源将内联为 base64 编码
		assetsInlineLimit: 0,
		//当设置为 true，构建后将会生成 manifest.json 文件
		manifest: false,
		//构建时清空该目录
		emptyOutDir: true,
		//chunk 大小警告的限制
		chunkSizeWarningLimit: 500
	},
	server: {
		host: '0.0.0.0'
	}
})
