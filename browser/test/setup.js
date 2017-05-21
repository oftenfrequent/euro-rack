import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
// import chaiImmutable from 'chai-immutable'

chai.use(chaiEnzyme())
// chai.use(chaiImmutable())


// IMPORT ITEMS TO TEST
	// ENVELOPE
	import e from '../components/Modules/Envelope/test/Envelope.spec'
	import eR from '../components/Modules/Envelope/test/EnvelopeReducer.spec'
import k from './Modules/KnobComponent.spec'


// NOTES
			// to call function on react component
			// const wrapper = shallow(<Button />)
			// wrapper.instance().handleClick()