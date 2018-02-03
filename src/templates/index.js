import React from 'react'
import PropTypes from 'prop-types'
import './template.css'

const Template = ({
  header,
  content,
  aside,
  footer
}) => (
  <div className="wrapper">
    <header className="header">{ header }</header>
    <article className="main">{ content }</article>
    <aside className="aside aside-1">{ aside }</aside>
    <footer className="footer">{ footer }</footer>
  </div>
)

Template.propTypes = {
  header: PropTypes.object,
  content: PropTypes.object,
  aside: PropTypes.object,
  footer: PropTypes.object
}

Template.defaultProps = {
  header: {},
  content: {},
  aside: {},
  footer: {}
}

export default Template;