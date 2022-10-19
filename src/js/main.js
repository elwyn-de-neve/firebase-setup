import React from 'react'
import ReactDOM from 'react-dom'

// Redux
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Routing, using HashRouter instead of BrowserRouter tomake sure no server-side config is needed
import { Router } from 'react-router-dom'
import { Routes, History } from './routes'


class App extends React.Component {

	// Render the main application element
	render( ) {
		return (

			// Connect redux store
			<Provider store={ store } >
				{ /* Redux store persistence across reloads and visits */ }
				<PersistGate loading={null} persistor={ persistor }>
					{ /* Connect router */ }
					<Router history={ History }>
						{ /* Load the Routes component, which renders the relevant screens at the relevant times */ }
						<Routes />
					</Router>
				</PersistGate>
			</Provider>

		)
	}
}

// Init app when html loaded
window.onload = f => ReactDOM.render( <App />, document.getElementById('container') )