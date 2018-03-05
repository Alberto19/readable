import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import FormGroup from '../../../../atoms/FormGroup/FormGroup'
import { getPostByIdAPI } from '../../../../util/Api'
import Vote from '../../../../atoms/Vote/Vote.container'
import CommentDetails from '../CommentDetails/CommentDetails.container'
import './PostDetails.css'

export default class PostDetails extends PureComponent {
  componentWillMount() {
    const { post, postId } = this.props
    if (post && post.postId) {
      this.setState({
        id: post.postId,
        author: post.author,
        title: post.title,
        body: post.body,
        category: post.category,
        timestamp: post.timestamp,
        voteScore: post.voteScore,
        isEditable: true,
      })
    } else if(postId) {
      this.getPostById(postId)
    } else {
      this.setState({
        id: `${Math.floor((Math.random() * 10000))}`,
        author: '',
        title: '',
        body: '',
        category: 'react',
        timestamp: Date.now(),
        isEditable: false
      })
    }
  }

  getPostById(postId) {
    return getPostByIdAPI(postId)
    .then(post => {
      if(!post.id) {
        this.props.history.push('/404')

        return
      }

      return this.setState({
        id: post.id,
        author: post.author,
        title: post.title,
        body: post.body,
        category: post.category,
        timestamp: post.timestamp,
        voteScore: post.voteScore,
        isEditable: true,
      })
    })
  }

  state = {
    id: `${Math.floor((Math.random() * 10000))}`,
    author: '',
    title: '',
    body: '',
    category: 'react',
    timestamp: Date.now(),
    voteScore: 0,
    isEditable: false,
  }

  onChangeHandler(e, stateField) {
    return this.setState({
      [stateField]: e.target.value
    })
  }

  formatDate(date, moment) {
    return moment(date).format('DD/MM/YYYY')
  }

  submit(e) {
    e.preventDefault()
    if(this.state.isEditable) {
      this.props.actions.editPost(this.state)
    }
    else {
      this.props.actions.createPost(this.state)
    }
    this.props.history.push('/')
  }

  deletePost(id) {
    this.props.actions.deletePost(id)
    this.props.history.push('/')
  }


  render() {
    const { categories, isLoading } = this.props
    const {id, author, title, body, category, isEditable, voteScore, timestamp } = this.state

    return (
      <div>
      <form id="PostModalForm" name="PostModalForm" className="container PostDetails" onSubmit={(e) => this.submit(e)}>
        <FormGroup
          label="Title"
          type="text"
          onChange={(e) => this.onChangeHandler(e, 'title')}
          value={title}
        />
        <FormGroup
          label="Author"
          type="text"
          onChange={(e) => this.onChangeHandler(e, 'author')}
          value={author}
        />
        <FormGroup
          label="Message"
          type="text"
          onChange={(e) => this.onChangeHandler(e, 'body')}
          value={body}
        />

        <div className="PostDetails__FormGroup row">
          <label htmlFor="author" className="col-sm-3">Categories:</label>
          <select
            className="col-sm-6"
            name="category"
            value={category}
            onChange={(e) => this.onChangeHandler(e, 'category')}
          >
          {isLoading === true && categories.length === 0
            ? <option>Seletion...</option>
            : categories.map(category => (
              <option key={ category.path }>{ category.name }</option>
            ))
          }
          </select>
        </div>


        <div className="PostDetails__Footer">
          <div>
            <span className="Card__Foote-date">{ this.formatDate(timestamp, moment) }</span>
            <Vote
              postId={id}
              voteScore={voteScore}
            />
          </div>
          <div>
            <Button bsStyle="primary"  type="submit">
              {
                isEditable ? 'Editar' : 'Enviar'
              }
            </Button>
            {isEditable ? <Button bsStyle="danger" onClick={() => this.deletePost(id)}>deletar</Button> : ''}
          </div>
        </div>
      </form>

      <CommentDetails />
      </div>
    )
  }
}

PostDetails.propTypes = {
  categories: PropTypes.array,
  isLoading: PropTypes.bool,
  actions: PropTypes.object,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  post: PropTypes.object,
  postId: PropTypes.string,
  history: PropTypes.object
}

PostDetails.defaultProps = {
  categories: [],
  isLoading: false,
  actions: {},
  openModal: () => {},
  closeModal: () => {},
  post: {},
  postId: ''
}
