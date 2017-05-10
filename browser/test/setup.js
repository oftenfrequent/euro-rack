import jsdom from 'jsdom'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
// import chaiImmutable from 'chai-immutable'

const dom = new jsdom.JSDOM('<!doctype html><html><body></body></html>')
const win = dom.window

global.document = dom
global.window = win

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key]
  }
})


chai.use(chaiEnzyme())
// chai.use(chaiImmutable())



// NOTES
			// to call function on react component
			// const wrapper = shallow(<Button />)
			// wrapper.instance().handleClick()