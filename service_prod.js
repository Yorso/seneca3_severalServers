/**
 * Service to multiply 2 numebrs 
 * Servicio para multiplicar 2 números
 * 
 * 
 * Multiply two given numbers - Multiplica dos números dados.
 * 
 * 
 * Copy this file in your MACH2 and run: nodejs service_prod.js
 * 
 * Try it writing in browser - Pruébalo escribiendo en el navegador:
 * 
 * 	http://192.168.1.72:8080/act/?role=math&oper=product&right=2&left=5
 *  Change IP for MACH2 IP
 *
 */

var plugin = function(options) {
    var seneca = this;
    
    seneca.add({role: "math", oper: "product"}, function(args, done) {
        done( null, { answer: args.left * args.right } )
    });

}
module.exports = plugin;

require( 'seneca' )()
.use( plugin )

// Listen for role:math messages - Escuchando los mensajes de role:math
// IMPORTANT: must match client - debe coincidir con el cliente
.listen( { pin:'area:mathop', port: 8080 } )