import { applyMiddleware, combineReducers, createStore } from 'redux'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'

// Reducers
import userReducer from './reducer/userReducer'
import loadingReducer from './reducer/loadingReducer'

// Redux persistance
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

// Reducers
const reducers = combineReducers( { 
	user: userReducer,
	loadingMessage: loadingReducer
} )

// Root reducer
const metaReducer = ( state, action ) => {

	switch( action.type ) {
		
		case "LOGOUTUSER_FULFILLED":
			state = undefined
		break

	}

	return reducers( state, action )
}

const persistedReducer = persistReducer( { key: 'root', storage }, metaReducer )

// Middleware
const middleware = applyMiddleware( logger, promise )


// Export store and persistor
export const store = createStore( persistedReducer, middleware )
export const persistor = persistStore( store )

// Worst case error handling
window.addEventListener( 'unhandledrejection', event => {
	console.log( event )
	alert( `Error: ${ event.reason.message }. The app will now reload.` )
	persistor.purge()
	location.href = '/'
} )

// Have a persistor purge query option
if( location.href.indexOf( 'purge' ) != -1 ) {
	console.log( 'Purge request detected' )
	persistor.purge()
	location.href = '/'
}