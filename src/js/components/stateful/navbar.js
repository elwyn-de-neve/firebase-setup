import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

// Data
import { logoutUser } from '../../redux/action/userActions'
import { panicReload } from '../../redux/action/loadingActions'
import { connect } from 'react-redux'

// Visual
import { Component } from '../stateless/generic'

// Navigation element
class NavMan extends Component {

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

		const { dispatch, user } = this.props
		const { open } = this.state

		return <nav id="sidebar" role='navigation'>

			<div onClick={ this.toggle } id='toggle'>
				<div className={ open && 'open' || '' } id='hamburger'>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>

			<div id="panel" className={ open && 'open' || '' }>
				<Link onClick={ this.toggle } id='homelink' to='/'>Home</Link>
				<a href="#" onClick={ f => dispatch( panicReload( ) ) } >Panic button</a>
				{ user && <a href="#" onClick={ f => dispatch( logoutUser() ).then( this.toggle ) } >Log Out</a> }
			</div>

			{ open && <div onClick={ this.toggle } id='closecapture'></div> }

	</nav>

	}

}

export default connect( store => ( { user: store.user ? true : false } ) )( NavMan )