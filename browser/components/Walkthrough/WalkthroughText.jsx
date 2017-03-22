import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import '../../style/app.scss'

export class WalkthroughText extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newText: false
    }
  }

  componentDidMount() {
    this.setState({newText: true})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.text !== this.props.text) {
      this.setState({newText: true})
    }
  }

  onMessageClick() {
    this.setState({newText: !this.state.newText})
  }

  render(){
    const classes = classNames({'walkthrough-text-container': true, 'open': this.state.newText, 'empty': !this.props.text })
    return (
      <div className={classes} onClick={(e) => this.onMessageClick()}>
        <div className='walkthrough-tab'>{'<'}</div>
        <div className='walkthrough-text'>{this.props.text}</div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    text: state.walkthrough.get('text')
  }
};

export default connect(
  mapStateToProps,
  {

  }
)(WalkthroughText);