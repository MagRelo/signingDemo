
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

  // get message data
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


  // send out fresh data
  MessageModel.find({}).sort({'updatedAt': 1}).limit(10)
    .then(messageArray => {return socket.emit('update', messageArray)})
    .catch(error => {return socket.emit('error', error.message)})


  // anyone can submit messages
  socket.on('message', function (data) {

    // authenticate (verify)
    const userAddress = sigUtil.recoverPersonalSignature({
      data: data.message,
      sig: data.signature
    })
    
    // format for convenience
    const messageData = unpackSignedData(data.message, data.signature, userAddress)

    // save message
    const message = new MessageModel(messageData)
    message.save()
      .then(savedMessage => {        
        return MessageModel.find({}).sort({'updatedAt': 1}).limit(10)
      })
      .then(messageArray => {return socket.emit('update', messageArray)})
      .catch(error => {return socket.emit('error', error.message)})

  })


  // admin's can delete
  socket.on('deleteAll', function (data) {
    
    // authenticate (verify)
    const userAddress = sigUtil.recoverTypedSignature({
      data: data.message,
      sig: data.signature
    })

    // authorize
    if(userAddress !== '0x106F681949E222D57A175cD85685E3bD9975b973'){
      return socket.emit('error', 'bad auth')
    }  

    // add user
    MessageModel.remove({})
      .then(result => {return socket.emit('success', result)})
      .catch(error => {return socket.emit('error', error.message)})

  });

});



// *
// helpers
// *

function unpackSignedData(messageParams, signature, userAddress) {
  
  const messageData = {
    'messageParams': messageParams,
    'signature': signature,
    'userAddress': userAddress,
    'content': ethUtil.toBuffer(messageParams).toString('utf8')
  }
  return messageData
}


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
  const messageData = unpackSignedData(authObject.message, authObject.signature, userAddress)
  const message = JSON.parse(messageData.content)
  const expirationDate = new Date(message.expires)
  if(expirationDate < Date.now()){    
    return res.status(401).send([])
  }

  // pass along userAddress
  req.userAddress = userAddress
  next()
}