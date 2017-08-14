import React from 'react'
import { connect } from 'react-redux'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import MessageBanner from '../MessageBanner/MessageBanner'
import { Link } from 'react-router-dom'
import './navbar.scss'

export class Navbar extends React.Component {
  constructor(props){
    super(props)
//    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }


  render(){
    return (
      <div>
        <div className='navbar-container clearfix'>
          <div className='logo-container'><span>Eurorack</span></div>
          <div className='link-list'>
            <div className='nav-list-item'>
              <Link to='/walkthrough'>Walkthrough</Link>
            </div>
            <div className='nav-list-item'>
              <Link to='/play'>Full Experience</Link>
            </div>
            <div className='nav-list-item'>
              <Link to='/login'>Login</Link>
            </div>
          </div>
        </div>
      <MessageBanner/>
      </div>
    )
      // <button onClick={() => this.props.testing()}>TESTING STUFF</button>
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
)(Navbar);
