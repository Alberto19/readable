import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CommentModal from './CommentModal'
import { openModal, closeModal } from '../../../../ducks/CommentModal/CommentModalReducer'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    openModal,
    closeModal,
  }, dispatch)
})

const  mapStateToProps = state => {
  return {
  commentModal: state.commentModal,
  isLoading: state.commentModal.isLoading,
}}

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)
