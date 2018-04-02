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
  componentWillMount(){
    this._loadComments()
  }
  _loadComments(){
    let comments= localStorage.getItem('comments')
    if(comments){
      comments=JSON.parse(comments)
      this.setState({comments})
    }
  }
  _saveComments(comments){
    localStorage.setItem('comments', JSON.stringify(comments))
  }
  handleSubmit(comment){
    if(!comment) return
    if(!comment.username) return alert('請輸入暱稱')
    if(!comment.content) return alert('請輸入內容')
    const comments=this.state.comments
    comments.push(comment)
    this.setState({ comments })
    this._saveComments(comments)
    // console.log(comment)
  }

  handleDeleteComment (index) {
    console.log(index)
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
  }
  render(){
    return(
      <div className="wrapper">
        <CommentInput 
          onSubmit={this.handleSubmit.bind(this)}
        />
        <CommentList comments={this.state.comments} 
        onDeleteComment={this.handleDeleteComment.bind(this)}/>
      </div>
      )
    //在 CommentApp 中给 CommentInput 传入一个 onSubmit 属性，这个属性值是 CommentApp 自己的一个方法 handleSubmitComment。这样 CommentInput 就可以调用 this.props.onSubmit(…) 把数据传给 CommenApp。
  }
}

export default CommentApp
