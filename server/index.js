
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const morgan = require('morgan');

const io = require('socket.io')(server);

const sigUtil = require('eth-sig-util')
const ethUtil = require('ethereumjs-util')

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

const UserSchema = new mongoose.Schema({  
  userAddress: String,
  text: String,
  theme: String
}, {timestamps: true});
const UserModel = mongoose.model('User', UserSchema);


// *
// Server & http routing
// *

// configure express middleware
app.use(express.static('build'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '1mb'}));
app.use(morgan('dev', {
  skip: function (req, res) {
    // remove the frontend dev server's 'json' calls from the console output
    return req.originalUrl.indexOf('json') > 0
  }
}));

// start server
server.listen(8080, () => {
  console.log('server listening on 8080');  
});

// User

// get user preferences
app.get('/api/user/preferences', servesaAuth, function(req, res){
  
  const expirationDate = new Date(req.userMessage.expires)
  if(expirationDate < Date.now()){    
    return res.status(401).send([])
  }

  MessageModel.find({'userAddress': req.userAddress})
    .then(messages => {return res.send(messages)})
    .catch(error => {return res.status(500).send(error)})      
})

// save user preferences
app.post('/api/user/preferences', servesaAuth, function(req, res){

  const userUpdate = {
    userAddress: req.userAddress,
    text: req.body.text,
    theme: req.body.theme
  }
  
  // update user 
  UserModel.update({userAddress: req.userAddress}, userUpdate, {upsert: true})
    .then(result => {return res.send(result)})
    .catch(error => {return res.status(500).send(error)}) 
})

// delete user preferences
app.delete('/api/user/delete', servesaAuth, function(req, res){

  // update user 
  UserModel.remove({userAddress: req.userAddress})
    .then(result => {return res.send(result)})
    .catch(error => {return res.status(500).send(error)}) 
})


// Messages

// message detail
app.get('/api/messages/:id', function(req, res){

  MessageModel.findOne({_id: req.params.id})
    .then(message => {return res.send(message)})
    .catch(error => {return res.status(500).send(error)})
})

app.get('/*', function(req, res){
  res.sendFile('index.html', { root: './build'});
});

// delete all messages
app.post('/api/messages/delete', servesaAuth, function(req, res){

  // auth
  if(req.userAddress != '0x863afa452f38966b54cb1149d934e34670d0683a'){
    return res.status(401).send({})
  }
  
  // delete all messages
  MessageModel.remove()
    .then(result => {return res.send(result)})
    .catch(error => {return res.status(500).send(error)}) 
})



// *
// sockets routing
// *

io.on('connection', function (socket) {

  // send out fresh data on connect
  MessageModel.find().sort({'updatedAt': 1})
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
        return MessageModel.find().sort({'updatedAt': 1})
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

  // parse message & check timestamp for expiration
  const message = JSON.parse(ethUtil.toBuffer(authObject.message).toString('utf8'))

  // pass along userAddress and message
  req.userAddress = userAddress
  req.userMessage = message

  // call next middleware function
  next()
}