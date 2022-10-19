import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Component } from '../stateless/generic'

class ActionButton extends Component {

	constructor( props ) {
		super( props )

		this.state = {
			open: false
		}

		this.toggle = this.toggle.bind( this )

	}


	toggle( ) {
		return this.updateState( { open: !this.state.open } )
	}

	render( ) {

		const { open } = this.state

		return <div id='actionbutton' className={ open ? 'open' : '' } >

			<div id='toggle' onClick={ this.toggle }>+</div>
			
			<Link onClick={ this.toggle } to='/' title='' className='action'>a</Link>
			<Link onClick={ this.toggle } to='/' title='' className='action'>b</Link>
			<Link onClick={ this.toggle } to='/' title='' className='action'>c</Link>
			
			{ open && <div onClick={ this.toggle } className='closecapture'></div> }
		</div>

	}

}

export default ActionButton