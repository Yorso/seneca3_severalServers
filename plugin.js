/**
 * Microservice plugin - Plugin de los microservicios
 * 
 * Add, subtract and multiply two given numbers - Suma y multiplica dos números dados.
 * 
 */
module.exports = function(options) {
    var seneca = this;
    var plugin = 'operations'
    
    // MACH1: Virtual or physical machine 1
    var senecaSum = require("seneca")().client({
        host: "192.168.1.81", // Change it for MACH1 IP - Cámbialo por la IP de MACH1
        port: 8080
    });

    // MACH2: Virtual or physical machine 2
    var senecaProd = require("seneca")().client({
        host: "192.168.1.72", // Change it for MACH2 IP - Cámbialo por la IP de MACH2
        port: 8080
    });
    
    // Calling to microservice that sum two numbers. It is running on MACH1
    // Llamada a microservicio que suma dos números. Está ejecutándose en MACH1
    seneca.add({area: "mathop", action: "addnum"}, function(args, done) {
        senecaSum.act({role: "math", oper: "sum", left: args.left, right: args.right}, function(err, result) {
            done(err, result);
        });
    });
    
    // Calling to microservice that multiplies two numbers. It is running on MACH2
    // Llamada a microservicio que multiplica dos números. Está ejecutándose en MACH2
    seneca.add({area: "mathop", action: "multnum"}, function(args, done) {
        senecaProd.act({role: "math", oper: "product", left: args.left, right: args.right}, function(err, result) {
            done(err, result);
        });
    });
    
    // Microservice that subtracts two numbers. It is executed on localhost
    // Micorservicio que resta dos números. Es ejecutado en local
    seneca.add({area: "mathop", action: "subnum"}, function(args, done) {
        done( null, { answer: args.right - args.left } )
    });
    
    // Forcing args to be numbers - Forzando a que los argumentos sean números
    seneca.wrap('area: mathop', function( msg, respond ) {
        msg.left  = Number(msg.left).valueOf()
        msg.right = Number(msg.right).valueOf()
        this.prior( msg, respond )
    })
    
    seneca.act('role:web',{ use: {
        prefix: '/operations',
        pin:    'area:mathop, action:*', // Send any role:math patterns out over the network - envía cualquier patrón role:math por la red
        								 // IMPORTANT: must match listening service - debe coincidir con el servicio
        map: {
          addnum:    {GET:true},
          multnum:   {GET:true},
          subnum:    {GET:true}
        }
    }})
    
    return{
    	name: plugin
    }
}