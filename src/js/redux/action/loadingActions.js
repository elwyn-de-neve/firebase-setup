export const setLoading = message => ( {
	type: 'SETLOADING',
	payload: Promise.resolve( message )
} )

export const panicReload = f => ( {
	type: 'PANICRELOAD',
	payload: Promise.resolve( confirm( 'This will log you out, unsaved work will be lost. Continue?' ) && ( location.href = '/?purge' ) )
} )