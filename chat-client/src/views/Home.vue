<template>
	<!-- PC端 -->
	<div class="home mvi-hidden-down-xs">
		<div class="home-wrap mvi-shadow">
			<div class="home-header">加入聊天室</div>
			<div class="home-input">
				<m-input class="mvi-cursor-pointer" size="large" border v-model.trim="name" placeholder="输入聊天室的名字..." :right="{ type: 'arrow-right', color: name ? '#666' : '#bbb' }" @right-click="goChatRoom" @keyup.enter="goChatRoom"></m-input>
				<div class="home-input-tips">输入聊天室名字后按回车加入聊天室或者点击输入右侧的箭头来加入</div>
			</div>
		</div>
	</div>
	<!-- 移动端 -->
	<div class="homem mvi-hidden-up-sm">
		<div class="homem-header">加入聊天室</div>
		<div class="homem-input">
			<div>
				<m-input size="large" border v-model.trim="name" placeholder="输入聊天室的名字..." :right="{ type: 'arrow-right', color: name ? '#666' : '#bbb' }" @right-click="goChatRoom" @keyup.enter="goChatRoom"></m-input>
				<div class="homem-input-tips">输入聊天室名字后按回车加入聊天室或者点击输入右侧的箭头来加入</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
//房间名称
const name = ref('')
//进入房间
const goChatRoom = () => {
	if (!name.value) {
		return
	}
	router.replace({
		name: 'chat',
		params: {
			name: encodeURIComponent(name.value)
		}
	})
}
</script>
<style lang="less" scoped>
@import '../styles/index.less';

.home {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.05);

	.home-wrap {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		width: 540px;
		height: 360px;
		background-color: #fff;
		border-radius: 4px;

		.home-header {
			width: 100%;
			padding: 10px;
			font-size: 24px;
			font-weight: bold;
			color: @color;
			text-align: center;
			position: relative;
			background-color: fade(@color, 16%);

			&::before {
				position: absolute;
				content: '';
				left: 50%;
				bottom: 6px;
				transform: translateX(-50%);
				width: 150px;
				height: 1px;
				background-color: @color;
			}
		}

		.home-input {
			width: 100%;
			flex: 1;
			display: block;
			padding: 50px 50px 100px 50px;

			.home-input-tips {
				font-size: 12px;
				color: #f30;
				padding: 10px 20px;

				&::before {
					content: '*';
					margin-right: 4px;
				}
			}
		}
	}
}

.homem {
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: #fff;

	.homem-header {
		display: block;
		width: 100%;
		padding: 10px;
		font-size: 20px;
		font-weight: bold;
		color: @color;
		text-align: center;
		position: relative;
		background-color: fade(@color, 16%);

		&::before {
			position: absolute;
			content: '';
			left: 50%;
			bottom: 6px;
			transform: translateX(-50%);
			width: 150px;
			height: 1px;
			background-color: @color;
		}
	}

	.homem-input {
		width: 100%;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20px;

		.homem-input-tips {
			font-size: 12px;
			color: #f30;
			padding: 10px 20px;

			&::before {
				content: '*';
				margin-right: 4px;
			}
		}
	}
}
</style>
