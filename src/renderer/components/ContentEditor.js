import React, { Component, PropTypes } from 'react'
import { ipcRenderer } from 'electron'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionDone from 'material-ui/svg-icons/action/done'
import ContentClear from 'material-ui/svg-icons/content/clear'

import Codemirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/jump-to-line'
import toMarkdown from 'to-markdown'
import marked from 'marked'


class ContentEditor extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      title: props.post.title,
      content: toMarkdown(props.post.content)
    }
  }

  handleChangeTitle(e) {
    console.log("changeTitle", e.target.value)
    this.setState({
      title: e.target.value
    })
  }

  handleChangeContent(content) {
    this.setState({
      content: content
    })
  }

  handleSave() {
    const { blog, post, onChangeMode } = this.props
    const { title, content } = this.state
    let newPost = Object.assign({}, post, {
      title: title,
      content: marked(content)
    })

    console.log("newPost", newPost)
    ipcRenderer.send('save-post-content', blog.name, newPost)
    onChangeMode()
  }

  handleCancel() {
    this.props.onChangeMode()
  }

  render() {
    const { title, content } = this.state

    let options = {
      lineNumbers: false,
      lineWrapping: true,
      mode: 'markdown',
      theme:'default'
    }

    return (
      <div className="content">
        <Toolbar>
          <ToolbarGroup style={{width:'100%'}}>
            <TextField hintText="Title" type="text" value={title} fullWidth={true}
              onChange={this.handleChangeTitle.bind(this)} />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <IconButton onClick={this.handleSave.bind(this)}><ActionDone /></IconButton>
            <IconButton onClick={this.handleCancel.bind(this)}><ContentClear /></IconButton>
          </ToolbarGroup>
        </Toolbar>

        <Codemirror ref="editor" options={options} value={content}
          onChange={this.handleChangeContent.bind(this)} />

      </div>
    )
  }
}

ContentEditor.propTypes = {
  blog: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  onChangeMode: PropTypes.func.isRequired
}

export default ContentEditor
