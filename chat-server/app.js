//引入socket
const ws = require('nodejs-websocket')
const { pushHistory, getHistory } = require('./history')

//消息接收
const onMessage = (server, connection, data) => {
	console.log('接收消息', data)
	//心跳检测
	if (data.cmd == 'heartbeat') {
		send(connection, {
			cmd: 'heartbeat'
		})
		return
	}
	//有人加入聊天室
	if (data.cmd == 'joinChatRoom') {
		//在聊天室内查找是否已经加入了
		const oldConn = server.connections.find(conn => {
			return conn.data?.userName == data.data.userName && conn.data?.name == data.data.name
		})
		//如果找到了表示已经加入聊天室了，先断开旧连接
		if (oldConn) {
			oldConn.close()
		}
		//绑定数据
		connection.data = {
			//用户名称
			userName: data.data.userName,
			//聊天室名称
			name: data.data.name
		}
		//广播告诉聊天室内的其他人有人加入
		const connections = server.connections.filter(conn => conn.data?.name == connection.data.name)
		const history = getHistory(data.data.name)
		connections.forEach(conn => {
			send(conn, {
				cmd: 'joinChatRoom',
				data: {
					//加入的人
					userName: data.data.userName,
					//加入的时间
					timeStamp: Date.now(),
					//在线人员列表
					userList: connections.map(item => item.data.userName),
					//聊天记录
					history: history
				}
			})
		})
		return
	}
	//有人发送消息
	if (data.cmd == 'message') {
		//广播告诉聊天室内的其他人有新消息
		const connections = server.connections.filter(conn => conn.data?.name == connection.data.name)
		const returnData = {
			//发送消息的人
			userName: connection.data.userName,
			//发送消息的时间
			timeStamp: Date.now(),
			//发送的消息
			message: data.data.message
		}
		connections.forEach(conn => {
			send(conn, {
				cmd: 'message',
				data: returnData
			})
		})
		//消息保存
		pushHistory(connection.data.name, returnData)
		return
	}
	//有人发送文件
	if (data.cmd == 'file') {
		//广播告诉聊天室内的其他人有文件
		const connections = server.connections.filter(conn => conn.data?.name == connection.data.name)
		const returnData = {
			//发送消息的人
			userName: connection.data.userName,
			//发送消息的时间
			timeStamp: Date.now(),
			//发送的文件信息
			filePath: data.data.filePath,
			fileName: data.data.fileName,
			fileType: data.data.fileType
		}
		connections.forEach(conn => {
			send(conn, {
				cmd: 'file',
				data: returnData
			})
		})
		//消息保存
		pushHistory(connection.data.name, returnData)
		return
	}
	//有人发送代码
	if (data.cmd == 'code') {
		//广播告诉聊天室内的其他人有新消息
		const connections = server.connections.filter(conn => conn.data?.name == connection.data.name)
		const returnData = {
			//发送消息的人
			userName: connection.data.userName,
			//发送消息的时间
			timeStamp: Date.now(),
			//发送的代码
			code: data.data.code
		}
		connections.forEach(conn => {
			send(conn, {
				cmd: 'code',
				data: returnData
			})
		})
		//消息保存
		pushHistory(connection.data.name, returnData)
		return
	}
}

//连接关闭
const onClose = (server, connection) => {
	console.log('有客户端关闭连接')
	const name = connection.data?.name
	//从聊天室退出
	if (name) {
		//广播告诉聊天室内的其他人有人退出
		const connections = server.connections.filter(conn => {
			return conn.data?.name == name && conn != connection
		})
		connections.forEach(conn => {
			send(conn, {
				cmd: 'exitChatRoom',
				data: {
					//退出的人
					userName: connection.data.userName,
					//退出时间
					timeStamp: Date.now(),
					//在线人员列表
					userList: connections.map(item => item.data.userName)
				}
			})
		})
	}
}

//发送消息
const send = (connection, data) => {
	connection.send(JSON.stringify(data))
}

//创建连接
const createServer = () => {
	let server = ws
		.createServer(connection => {
			//接收消息
			connection.on('text', function (result) {
				onMessage(server, connection, JSON.parse(result))
			})
			connection.on('close', function (code) {
				console.log('关闭连接', code)
				onClose(server, connection)
			})
			connection.on('error', function () {
				try {
					connection.close()
				} catch (error) {}
			})
		})
		.listen(3066)
	return server
}

module.exports = createServer()
