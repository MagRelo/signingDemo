
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const sigUtil = require('eth-sig-util')
const camelCase = require('camelcase')

// addresses that are not allowed to post messages
const banList = []

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
app.use(express.static('build_webpack'))
app.get('/*', function(req, res){
  res.sendFile('index.html', { root: './build_webpack'});
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
  MessageModel.find({})
    .then(messageArray => {return socket.emit('update', messageArray)})
    .catch(error => {return socket.emit('error', error.message)})


  // anyone can submit messages
  socket.on('message', function (data) {

    // authenticate (verify)
    const userAddress = sigUtil.recoverTypedSignature({
      data: data.message,
      sig: data.signature
    })
    
    // authorize
    if(banList.indexOf(userAddress) > -1){
      return socket.emit('error', 'bad auth')
    }
    
    // format for convenience
    const messageData = unpackSignedData(data.message, data.signature, userAddress)

    // save message
    const message = new MessageModel(messageData)
    message.save()
      .then(savedMessage => {        
        return MessageModel.find({})
      })
      .then(messageArray => {return socket.emit('update', messageArray)})
      .catch(error => {return socket.emit('error', error.message)})

  })


  // admin's can delete
  socket.on('login', function (data) {
    
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
    'userAddress': userAddress
  }

  // copy msgParams data to js object for convenience
  messageParams.forEach(element => {
    messageData[camelCase(element.name)] = element.value
  })

  return messageData
}
