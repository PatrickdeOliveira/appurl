var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fetchUrl = require('fetch').fetchUrl;

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/css', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));

app.route('/')
  .get(function(req, res) {
    res.render('index');
  })
  .post(function(req, res) {
    var regexp = /\/{2}(w{3}\.{1})?([\w-]+\.{1})+(\w+)/g;
    var urls = [];

    if (!regexp.test(req.body.url)) {
      res.render('index');
    } else {
      fetchUrl(req.body.url, function(error, meta, body) {
        if (error) {
          console.error(error);
          return;
        }
  
        body.toString().match(regexp).forEach(function(url) {
          if (urls.indexOf(url) == -1) urls.push(url);
        });

        res.render('table', {data: urls});
      })
    }
  });
  //

app.get('/hey', function (req, res) {
  res.render('hey');

  
})

.post(function(req, res){
  	
  })




app.listen(3002, function() {
  console.log('Running at localhos:3000');
});