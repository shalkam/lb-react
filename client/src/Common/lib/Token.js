module.exports = function(token) {
    return function ( request ){
        // "config" is a global var where token and other stuff resides
        if ( token ) {
            request.set( 'Authorization', token );
        }
    }
}