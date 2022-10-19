import React from 'react'
import ReactDOM from 'react-dom'

// Better root component
export class Component extends React.Component {

  constructor( props ) {
    super( props )

    // Class-wide functions
    // Update the state in an async way
    this.promiseState = newState => new Promise( resolve => this.setState( newState, resolve ) )
    // A helper to update the state without replacing it
    this.updateState = updates => this.promiseState( { ...this.state, ...updates } )
    // Binding
    this.binder = functionToBind => this[ functionToBind.name ] = functionToBind.bind( this )
    
  }

}

// Placeholder
export const Loading = false