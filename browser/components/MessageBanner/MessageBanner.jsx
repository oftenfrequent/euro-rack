import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import '../../style/app.scss'

export class MessageBanner extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      messageOver: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.error && this.props.error) {
      setTimeout(() => {
        this.setState({messageOver: true})
      }, 5000)
    }
    if(prevProps.error && !this.props.error) {
      this.setState({messageOver: false})
    }
  }



  render(){
    const classes = classNames({'message-banner': true, 'empty': (!this.props.error || this.state.messageOver) })
    return (
      <div className={classes}>
        <div className='banner-text'>{this.props.error}</div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    error: state.eurorack.getIn(['patchCables', 'error'])
  }
};

export default connect(
  mapStateToProps,
  {

  }
)(MessageBanner);