
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const sigUtil = require('eth-sig-util')
const ethUtil = require('ethereumjs-util')
const camelCase = require('camelcase')

// *
// db
// *

// Connect to mongoDb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL_INT || 'mongodb://127.0.0.1:27017/signdemo');
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
	}
);

// setup Mongoose message schema & model
const MessageSchema = new mongoose.Schema({
  messageParams: Object,
  signature: String,
  userAddress: String,
  content: String
}, {timestamps: true});
const MessageModel = mongoose.model('Message', MessageSchema);


// *
// Server & http routing
// *

// serve the react app for all http requests

app.get('/api/message/:id', function(req, res){

  MessageModel.findOne({_id: req.params.id})
    .then(message => {return res.send(message)})
    .catch(error => {return res.status(500).send(error)})
})

app.get('/api/userdata', servesaAuth, function(req, res){

  MessageModel.find({'userAddress': req.userAddress})
    .then(messages => {return res.send(messages)})
    .catch(error => {return res.status(500).send(error)})      
})

app.use(express.static('build'))
app.get('/*', function(req, res){
  res.sendFile('index.html', { root: './build'});
});
// start server
server.listen(8080, () => {
  console.log('server listening on 8080');  
});


// *
// sockets routing
// *

io.on('connection', function (socket) {

  // send out fresh data on connect
  MessageModel.find({}).sort({'updatedAt': 1}).limit(10)
    .then(messageArray => {return socket.emit('update', messageArray)})
    .catch(error => {return socket.emit('error', error.message)})


  socket.on('message', function (data) {

    // authenticate (verify)
    const userAddress = sigUtil.recoverPersonalSignature({
      data: data.message,
      sig: data.signature
    })
    
    // save message
    const message = new MessageModel({
      'userAddress': userAddress,
      'messageParams': data.message,
      'signature': data.signature,      
      'content': ethUtil.toBuffer(data.message).toString('utf8')
    })

    message.save()
      .then(savedMessage => {        
        return MessageModel.find({}).sort({'updatedAt': 1}).limit(10)
      })
      .then(messageArray => {
        return socket.emit('update', messageArray)
      })
      .catch(error => {return socket.emit('error', error.message)})

  })

});



// *
// helpers
// *

function servesaAuth(req, res, next){

  // check for header
  if(!req.headers['x-servesa']){    
    return res.status(401).send([])
  }

  // parse header object
  const authObject = JSON.parse(req.headers['x-servesa'])
  if(!authObject.message || !authObject.signature){    
    return res.status(401).send([])
  }

  // recover public key
  const userAddress = sigUtil.recoverPersonalSignature({
    data: authObject.message,
    sig: authObject.signature
  })

  // parse message, check timestamp for expiration
  const message = JSON.parse(ethUtil.toBuffer(authObject.message).toString('utf8'))
  const expirationDate = new Date(message.expires)
  if(expirationDate < Date.now()){    
    return res.status(401).send([])
  }

  // pass along userAddress
  req.userAddress = userAddress
  next()
}