require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
//modus dns
const dns = require('dns');
//body parser
const bodyParser = require('body-parser');
//shortid untuk keyword(kodeunik)
const shortid = require('shortid');
const { error } = require('console');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

//body-parser utk menangani request POST
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const urlDatabase={};

//utk menyimpan url
app.post("/api/shorturl",function(req,res){
  const url = req.body.url;
  //cek url valid/tidak
  try {
    const urlObject = new URL(url);
    if(urlObject.protocol !== "http:" && urlObject.protocol !== "https:"){
      return res.json({error: "invalid url"});
    }
    //verif URL menggunakan dns.lookup
    dns.lookup(urlObject.hostname, (err)=>{
      if(err){
        return res.json({error:"invalid url"});
      }
      //generate short_url
      const short_url = shortid.generate();
      //simpan url dan short_url
      urlDatabase[short_url] = url;
      //kirim response JSON
      res.json({
        original_url:url,
        short_url:short_url
      });
    });

  }
  catch(e){
    return res.json({error:"invalid url"});
  }
});

//endpoint untuk redirect ke original url
app.get("/api/shorturl/:short_url", function(req,res){
  const short_url = req.params.short_url;
  //cek url di dtabase
  if(urlDatabase[short_url]){
    res.redirect(urlDatabase[short_url]);
  }
  else{
    res.json({error:"invalid url"});
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
