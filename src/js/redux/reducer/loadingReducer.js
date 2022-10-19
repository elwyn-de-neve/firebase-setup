const loadingReducer = ( state = null, action ) => {

	switch( action.type ) {

		case "SETLOADING_FULFILLED":
			return action.payload
		break

		// if anything other than setloading happened, don't be loading
		default:
			return state
	}
}
export default loadingReducer