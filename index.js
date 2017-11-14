const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});
const express = require( 'express' );
const app     = express();
const bodyParser = require('body-parser')
const path    = require( 'path' );
client.ping({
     requestTimeout: 30000,
 }, function(error) {
     if (error) {
         console.error('elasticsearch cluster is down!');
     } else {
         console.log('Everything is ok');
     }
 });

 client.indices.create({
     index: 'scotch.io-tutorial'
 }, function(error, response, status) {
     if (error) {
         console.log(error);
     } else {
         console.log("created new index", response);
     }
 });


const cities = require('./cities.json');
var bulk = [];
cities.forEach(city =>{
  bulk.push({index:{ 
                _index:"scotch-tutorial", 
                _type:"cities_list",
            }
          
        })
  bulk.push(city)
})


client.bulk({body:bulk}, function( err, response  ){ 
        if( err ){ 
            console.log("Failed Bulk operation".red, err) 
        } else { 
            console.log("Successfully imported %s".green, bulk.length); 
        } 
    }); 





app.use(bodyParser.json())
app.set( 'port', process.env.PORT || 3001 );
app.use( express.static( path.join( __dirname, 'public' )));

app.get('/', function(req, res){
  res.sendFile('template.html', {
     root: path.join( __dirname, 'views' )
   });
})

app.get('/v2', function(req, res){
  res.sendFile('template2.html', {
     root: path.join( __dirname, 'views' )
   });
})

app.get('/search', function (req, res){
  
  let body = {
    size: 200,
    from: 0, 
    query: {
      match: {
          name: req.query['q']
      }
    }
  }

  client.search({index:'scotch-tutorial',  body:body, type:'cities_list'})
  .then(results => {
    res.send(results.hits.hits);
  })
  .catch(err=>{
    console.log(err)
    res.send([]);
  });
  
})






app .listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
} );
