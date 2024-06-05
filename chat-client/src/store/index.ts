import { createStore } from 'vuex'
const store = createStore({
	state: {
		userName: ''
	},
	getters: {
		userName(state) {
			if (state.userName) {
				return state.userName
			}
			return localStorage.getItem('CHAT_ROOM_USERNAME') || ''
		}
	},
	mutations: {
		userName(state, value) {
			if (!value) {
				state.userName = ''
				localStorage.removeItem('CHAT_ROOM_USERNAME')
			} else {
				state.userName = value
				localStorage.setItem('CHAT_ROOM_USERNAME', value)
			}
		}
	}
})
export default store
