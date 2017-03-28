import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
// import '../../style/app.scss'

export class WalkthroughText extends React.Component {
  constructor(props){
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      newText: false
    }
  }

  componentDidMount() {
    this.setState({newText: true})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.text.__html !== this.props.text.__html) {
      this.setState({newText: true})
    }
  }

  onMessageClick() {
    this.setState({newText: !this.state.newText})
  }

  render(){
    const classes = classNames({'walkthrough-text-overlay': true, 'open': this.state.newText, 'empty': !this.props.text })
    return (
      <div className={classes} onClick={(e) => this.onMessageClick()}>
        <div className='walkthrough-tab'>{'<'}</div>
        <div className='walkthrough-text-container'>
          <div
            className='walkthrough-text'
            dangerouslySetInnerHTML={this.props.text}
          />
          {this.props.showOptOutMessage
            ? (<p>
                {'If you know what you are doing, feel free to head straight to the '}
                <Link to='/play'>full eurorack experience</Link>
              </p>
              )
            : null
          }
          {this.props.stepCompleted
            ? <button onClick={(e) => this.props.callNextStep(e)} className=''>NEXT</button>
            : null
          }
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
  }
};

export default connect(
  mapStateToProps,
  {

  }
)(WalkthroughText);