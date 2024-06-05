/// <reference types="vite/client" />
declare module 'vuex' {
	export * from 'vuex/types/index.d.ts'
}
declare module 'sockjs-client/dist/sockjs.js' {
	import Sockjs from 'sockjs-client'
	export default Sockjs
}
