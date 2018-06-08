import React from 'react'
import { render } from 'react-dom'
import './css/circuit.css'
import './css/flex.css'
import './css/normalize.min.css'
import './css/font-awesome.min.css'
import App from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(<App remote="https://limitless-springs-21862.herokuapp.com"/>, document.querySelector('#main'))

// http://circuitapi.uswest.appfog.ctl.io
// http://circuitapi.jz3anb7wti.us-west-2.elasticbeanstalk.com
// https://api.circuit.space
// https://limitless-springs-21862.herokuapp.com

