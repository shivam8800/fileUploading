import fs from 'fs'
var formidable = require('formidable');

const routes =[
	{
        method:'GET',
		path:'/home',
		handler: function(request, reply){
			reply.file('./views/default.html');
		}
    },
	{
		method: 'POST',
		path: '/file',
		config: {
			handler: function (request, reply) {
				const payload = JSON.stringify(request.payload)
				var todaydate = new Date();
				var stringdate = todaydate.toISOString();

				const filepath = __dirname +'/uploads/' + stringdate + ".txt"
				var file = fs.openSync(filepath, 'w+');

				fs.writeFile(filepath, payload, function (err) {
					  if (err) {
					  	return console.log(err);
					  }
				});
				// console.log(payload)

	  reply('Received your data')
			},
			payload: {
			  maxBytes: 209715200,
			  output: 'data',
			  parse: true
			}
		}
	}
]

export default routes;
