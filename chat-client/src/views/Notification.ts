class CustomNotify {
	constructor() {
		if ('Notification' in window) {
			Notification.requestPermission()
		}
	}

	/**
	 * 发送通知
	 * @param body
	 * @param title
	 */
	send(body: string, title: string | undefined = '你有一条新消息') {
		if (Notification.permission == 'granted') {
			const notification = new Notification(title, {
				lang: 'zh-CN',
				body: body,
				icon: './logo.svg',
				badge: './logo.svg'
			})
			notification.onclick = () => {
				window.focus()
				notification.close()
			}
		}
	}
}

export const customNotify = new CustomNotify()
