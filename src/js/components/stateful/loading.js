import React from 'react'
import ReactDOM from 'react-dom'
import { Component } from '../stateless/generic'

import { setLoading } from '../../redux/action/loadingActions'

export default class Loading extends Component {

	constructor( props ) {
		super( props )

		this.state = {
			delay: 5000,
			counters: []
		}
		const { message } = props

		// If message is string, show message
		if( typeof message == 'string' ) this.state.message = message

		// if message is array, show the first and start counter
		if( Array.isArray( message ) ) { 
			this.state.message = message[0]

			for (let i = message.length - 1; i >= 0; i--) {
				this.state.counters.push( setTimeout( f => this.updateState( { message: message[i] } ), this.state.delay*i ) )
			}
		 }

	}

	componentWillUnmount (  ) {
		const { counters } = this.state
		for (let i = counters.length - 1; i >= 0; i--) {
			clearTimeout( counters[i] )
		}
	}


	render(  ) {

		const { message } = this.state

		return <div id="loading">
			<div className="lds-dual-ring"></div>
			<div id="message">{ message }</div>
		</div>
	}

}