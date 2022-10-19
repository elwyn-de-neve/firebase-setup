import { SHA3 } from 'sha3'

// Grab the values of a form from it's event object
export const valuesFromEvent = event => {

	// if it is a single element
	if( event.target.nodeName == 'INPUT' ) return event.target.type == 'checkbox' ? event.target.checked : event.target.value

	// If it is a form (target has multiple elements)
	let result = {}
	for( let element of event.target ) {
		if( element.value || element.checked ) result[ element.name ] = element.type == 'checkbox' ? element.checked : element.value

		// if input type is file, return file, not value
		if( element.type == 'file' ) result[ element.name ] = element.files.length <= 1 ? element.files[0] : element.files
	}
	return result
}

// Timestamps
export const stringToMsTimestamp = string => Date.parse( string )
export const msTimestampToString = ms => {
	const date = new Date( ms ).toDateString()
	return date.includes( 'Invalid' ) ? undefined : date
}
export const msTimestampToYYYMMDD = ms => {
	const theDate = new Date( ms )
	const d = {
		day: String( theDate.getDate() ),
		month: String( theDate.getMonth() + 1 ),
		year: theDate.getFullYear()
	}
	return `${ d.year }-${ d.month.length < 2 ? '0' + d.month : d.month }-${ d.day.length < 2 ? '0' + d.day : d.day }`
}
export const timeStamp = f => new Date( ).getTime()

// Hashing, hash string or make random hash based on time & randomness
export const hash = source => new SHA3( 512 )
.update( source || String( Math.random() + new Date().getTime() ) )
.digest( 'hex' )