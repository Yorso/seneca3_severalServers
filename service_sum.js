/**
 * Service to sum 2 numebrs
 * Servicio para sumar 2 números
 * 
 * 
 * Add two given numbers - Suma dos números dados.
 * 
 * 
 * Copy this file in your MACH1 and run: nodejs service_sum.js
 * 
 * Try it writing in browser - Pruébalo escribiendo en el navegador:
 * 
 * 	http://192.168.1.81:8080/act/?role=math&oper=sum&right=2&left=5
 *  Change IP for MACH1 IP
 *
 */

var plugin = function(options) {
    var seneca = this;
    
    seneca.add({role: "math", oper: "sum"}, function(args, done) {
        done( null, { answer: args.left + args.right } )
    });

}
module.exports = plugin;

require( 'seneca' )()
.use( plugin )

// Listen for role:math messages - Escuchando los mensajes de role:math
// IMPORTANT: must match client - debe coincidir con el cliente
.listen( { pin:'area:mathop', port: 8080 } )
