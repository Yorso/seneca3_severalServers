/**
 * Simple microservice example, running on 2 servers
 * Ejemplo sencillo de microservicios, ejecutándose en dos servidores 
 * 
 * 
 * Add and multiply two given numbers - Suma y multiplica dos números dados.
 * 
 * 
 * Try it writing in browser - Pruébalo escribiendo en el navegador:
 * 
 * 	Sum: http://localhost:3000/operations/addnum/?right=2&left=33       
 * 	Product: http://localhost:3000/operations/multnum/?right=2&left=33
 *  Subtract: http://localhost:3000/operations/subnum/?right=2&left=33
 *
 */

var seneca = require("seneca")();
seneca.use('plugin');

var app = require("express")();
app.use(seneca.export("web"));
app.listen(3000);