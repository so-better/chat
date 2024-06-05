//历史记录
const HISTORY_LIST = {}

//将消息加入历史记录
const pushHistory = (name, data) => {
	if (HISTORY_LIST[name]) {
		HISTORY_LIST[name].push(data)
	} else {
		HISTORY_LIST[name] = [data]
	}
}
//获取消息记录
const getHistory = name => {
	return HISTORY_LIST[name] || []
}

module.exports = {
	pushHistory,
	getHistory
}
