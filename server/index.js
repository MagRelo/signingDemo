const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const morgan = require('morgan');

const io = require('socket.io')(server);

const sigUtil = require('eth-sig-util');
const ethUtil = require('ethereumjs-util');

// *
// db
// *

// Connect to mongoDb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URL_INT || 'mongodb://127.0.0.1:27017/signdemo'
);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

const ContractSchema = new mongoose.Schema(
  {
    contractAddress: String,
    userAddress: String,
    name: String,
    position: String,
    intro: String,
    basePrice: Number,
    totalSupply: Number,
    basis: Number,
    exponent: Number,
    transactions: []
  },
  { timestamps: true }
);
const ContractModel = mongoose.model('Contract', ContractSchema);

// *
// Server & http routing
// *

// configure express middleware
app.use(express.static('build_client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(
  morgan('dev', {
    skip: function(req, res) {
      // remove the frontend dev server's 'json' calls from the console output
      return req.originalUrl.indexOf('json') > 0;
    }
  })
);

// start server
server.listen(8080, () => {
  console.log('server listening on 8080');
});

// create contract
app.post('/api/contracts', function(req, res) {
  const newContract = new ContractModel();
  newContract
    .save(req.body)
    .then(contract => {
      return res.send(contract);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
});

// list contracts
app.get('/api/contracts', function(req, res) {
  ContractModel.find({})
    .then(list => {
      return res.send(list);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
});

// get contract by internal id
app.get('/api/contracts/:id', function(req, res) {
  ContractModel.find({ _id: req.params.id })
    .then(contract => {
      return res.send(contract);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
});

// get contracts by account
app.get('/api/account/:address', function(req, res) {
  ContractModel.find({ userAddress: req.params.address })
    .then(contract => {
      return res.send(contract);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
});

app.get('/api/search', function(req, res) {
  const query = req.query.searchValue;

  ContractModel.find({
    $or: [
      { name: searchValue },
      { position: searchValue },
      { intro: searchValue }
    ]
  })
    .then(contract => {
      return res.send(contract);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
});

app.get('/*', function(req, res) {
  res.sendFile('index.html', { root: './build_client' });
});

// *
// sockets routing
// *

io.on('connection', function(socket) {
  // send out fresh data on connect
  // MessageModel.find()
  //   .sort({ updatedAt: 1 })
  //   .then(messageArray => {
  //     return socket.emit('update', messageArray);
  //   })
  //   .catch(error => {
  //     return socket.emit('error', error.message);
  //   });
  // socket.on('message', function(data) {
  //   // authenticate (verify)
  //   const userAddress = sigUtil.recoverPersonalSignature({
  //     data: data.message,
  //     sig: data.signature
  //   });
  //   // save message
  //   const message = new MessageModel({
  //     userAddress: userAddress,
  //     messageParams: data.message,
  //     signature: data.signature,
  //     content: ethUtil.toBuffer(data.message).toString('utf8')
  //   });
  //   message
  //     .save()
  //     .then(savedMessage => {
  //       return MessageModel.find().sort({ updatedAt: 1 });
  //     })
  //     .then(messageArray => {
  //       return socket.emit('update', messageArray);
  //     })
  //     .catch(error => {
  //       return socket.emit('error', error.message);
  //     });
  // });
});

// *
// helpers
// *

function servesaAuth(req, res, next) {
  // check for header
  if (!req.headers['x-servesa']) {
    return res.status(401).send([]);
  }

  // parse header object
  const authObject = JSON.parse(req.headers['x-servesa']);
  if (!authObject.message || !authObject.signature) {
    return res.status(401).send([]);
  }

  // recover public key
  const userAddress = sigUtil.recoverPersonalSignature({
    data: authObject.message,
    sig: authObject.signature
  });

  // parse message & check timestamp for expiration
  const message = JSON.parse(
    ethUtil.toBuffer(authObject.message).toString('utf8')
  );

  // pass along userAddress and message
  req.userAddress = userAddress;
  req.userMessage = message;

  // call next middleware function
  next();
}
