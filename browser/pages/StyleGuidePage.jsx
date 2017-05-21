import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { resetEuroRack } from '../components/EuroRack/EuroRackActions'
import LoginForm from '../components/Auth/LoginForm'

export class StyleGuidePage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillMount() {
    fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=2')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <h1>StyleGuide Page</h1>
        </div>
        <div className='row'>
          <div className='nine columns'>
            <input type='text' ref='email' placeholder='email' defaultValue='asd@asd' />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    // auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  {

 }
)(StyleGuidePage)

