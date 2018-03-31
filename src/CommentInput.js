import React, { Component } from 'react'

class CommentInput extends Component{
	/*因为还没有加入处理逻辑，所以你输入内容，然后点击发布是不会有什么效果的。用户可输入内容一个是用户名（username），一个是评论内容（content），我们在组件的构造函数中初始化一个 state 来保存这两个状态：*/
	constructor(){
		super()
		this.state={
			username:'',
			content:''
		}
	}
	componentDidMount(){
		this.textarea.focus()
	}
	
	componentWillMount () {
	    this._loadUsername()
	}

	_loadUsername(){
		const username=localStorage.getItem('username')
		if(username){
			this.setState({username})
		}
	}
	_saveUsername(username){
		localStorage.setItem('username',username)
	}
	handleUsernameBlur(event){
		this._saveUsername(event.target.value)
	}
	handleUsernameChange(event){
		this.setState({
			username:event.target.value
		})
	}
	/*通过 event.target.value 获取 <input /> 中用户输入的内容，然后通过 setState 把它设置到 state.username 当中，这时候组件的内容就会更新，input 的 value 值就会得到更新并显示到输入框内。*/
	handleContentChange(event){
		this.setState({
			content:event.target.value
		})
	}
	handleSubmit(){
		if(this.props.onSubmit){
			const{username,content}=this.state
			this.props.onSubmit({username, content})
		}
		this.setState({content:''})
	}
	render(){
		return(
				<div className='Comment-input'>
					<div className='comment-field'>
			          <span className='comment-field-name'>暱稱：</span>
			          <div className='comment-field-input'>
			            <input onBlur={this.handleUsernameBlur.bind(this)}
			            	   value={this.state.username} 
			            	   onChange={this.handleUsernameChange.bind(this)} />
			          </div>
			        </div>
			        <div className='comment-field'>
			          <span className='comment-field-name'>評論內容：</span>
			          <div className='comment-field-input'>
			            <textarea ref={(textarea) => this.textarea = textarea}
			            		  value={this.state.content} 
			                      onChange={this.handleContentChange.bind(this)}/>
			          </div>
			        </div>
			        <div className='comment-field-button'>
			          <button onClick={this.handleSubmit.bind(this)}>
			            發送
			          </button>
			        </div>
				</div>
				//撰寫CommentInput的Html
				//並且給輸入框設置value屬性，讓它們的value值等於this.state裡面的值
				/*在 React.js 当中必须要用 setState 才能更新组件的内容，所以我们需要做的就是：监听输入框的 onChange 事件，然后获取到用户输入的内容，再通过 setState 的方式更新 state 中的 username，这样 input 的内容才会更新。*/
				//所以当用户点击发布按钮的时候，我们就将 CommentInput 的 state 当中最新的评论数据传递给父组件 CommentApp ，然后让父组件把这个数据传递给 CommentList 进行渲染。
/*CommentInput 如何向 CommentApp 传递的数据？父组件 CommentApp 只需要通过 props 给子组件 CommentInput 传入一个回调函数。当用户点击发布按钮的时候，CommentInput 调用 props 中的回调函数并且将 state 传入该函数即可。*/
			)
	}
}

export default CommentInput
