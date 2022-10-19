import React from 'react'
import ReactDOM from 'react-dom'
import { Component } from '../stateless/generic'

// Data
import { connect } from 'react-redux'
import { valuesFromEvent } from '../../modules/helpers'

// Data actions
// import { getUser, registerUser, loginUser, logoutUser } from '../../redux/action/userActions'
import { setLoading } from '../../redux/action/loadingActions'

class LoginRegister extends Component {

	constructor( props ) {

		super( props )

		this.state = {
			action: 'login'
		}

		this.toggleAction = this.toggleAction.bind( this )
		this.handleSumbit = this.handleSumbit.bind( this )
	}

	toggleAction( e ) {
		e.preventDefault()
		const { action } = this.state
		return this.updateState( { action: action == 'login' ? 'register' : 'login' } )
	}

	async handleSumbit( event ) {

		// Destructure data
		const { action } = this.state
		const { name, email, password } = valuesFromEvent( event )
		const { dispatch } = this.props

		// No browser submit
		event.preventDefault()

		// Loading screen
		await dispatch( setLoading( action == 'register' ? 'Registering...' : 'Logging in...' ) )

		// Do login/register
		await ( action == 'register' ? dispatch( registerUser( name, email, password ) ) : dispatch( loginUser( email, password ) ) ).catch( err => alert( err.message ) )

		// Close loading screen
		await dispatch( setLoading( false ) )

	}


	render( ) {

		const { action } = this.state

		return <div className="card">
			<form onSubmit={ this.handleSumbit } >
				<h2>{ action }</h2>
				{ action == 'register' && <input name="name" type='text' placeholder="name" /> }
				<input name="email" type="email" placeholder="email" autoComplete="email" />
				<input name="password" type="password" placeholder="password" autoComplete="current-password" />
				<input type="submit" value={ action } />
				<a onClick={ this.toggleAction } href="#">Or { action == 'login' ? 'register' : 'login' } instead</a>
			</form>
		</div>
	}

}

export default connect( store => ( {
	user: store.user
} ) )( LoginRegister )