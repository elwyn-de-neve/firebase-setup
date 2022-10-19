// import * as firebase from 'firebase'
import * as firebase from 'firebase/app'
import '@firebase/firestore'
import '@firebase/auth'

// Gitignored config file in root directory
const config = require( '../../../firebase.js' )

class App {

	constructor( ) {
		// Initialise Firebase connection
		this.fb = firebase.initializeApp( config )

		// Init firestore connection
		this.db = this.fb.firestore()

		// Default values
		this.user = undefined
	}


	// ///////////////////////////////
	// User management
	// ///////////////////////////////

	// Grabs the user from state, if unavailable ask firebase
	getUser( ) {

		return new Promise( res => {

			// Return currently known user
			if( this.user ) return res( this.user )

			// Otherwise ask firebase
			return this.fb.auth().onAuthStateChanged( user => res( user ) )
		} )
	}

	async registerUser( username, email, password ){

		// Register with firebase
		await this.fb.auth().createUserWithEmailAndPassword( email, password )

		// Log in user and hold on it it
		let user = await this.loginUser( email, password )

		// Set displayname if it was entered
		if( user ) await user.updateProfile( {
			displayName: username
		} )

		// Return the user so the interface can use it
		return this.user
	}

	async loginUser( email, password ) {

		// Sign in and get user data, the signInWithEmailAndPassword returns a credential object, not a user, hence the destructiring
		let { user } = await this.fb.auth().signInWithEmailAndPassword( email, password )

		// Set the user to the state and return the value
		if( user ) return this.user = user
	}

	// Log out, .signout returns a promise so no async/await needed
	logoutUser(  ) {
		return this.fb.auth().signOut( )
	}

}

// Export initialised app
export default new App()