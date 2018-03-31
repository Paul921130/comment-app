import React, {Component} from 'react';
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component{
  constructor(){
    super()
    this.state={
      comments:[]
    }
  }
  handleSubmit(comment){
    if(!comment) return
    if(!comment.username) return alert('請輸入暱稱')
    if(!comment.content) return alert('請輸入內容')
    this.state.comments.push(comment)
    this.setState({
      comments:this.state.comments
    })
    console.log(comment)
  }
  render(){
    return(
      <div className="wrapper">
        <CommentInput 
          onSubmit={this.handleSubmit.bind(this)}
        />
        <CommentList comments={this.state.comments} />
      </div>
      )
    //在 CommentApp 中给 CommentInput 传入一个 onSubmit 属性，这个属性值是 CommentApp 自己的一个方法 handleSubmitComment。这样 CommentInput 就可以调用 this.props.onSubmit(…) 把数据传给 CommenApp。
  }
}

export default CommentApp
