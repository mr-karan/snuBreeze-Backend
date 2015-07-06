// require all
var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var mongoose     = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema       = mongoose.Schema;

// define schemas
var eventSchema   = new Schema({
  name: String
});
var userSchema = new Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  facebook: {
    id: String,
    email: String
  },
  google: {
    id: String,
    email: String
  }
});
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
var User = mongoose.model('User', userSchema);
var Event = mongoose.model('Event', eventSchema);
mongoose.connect('localhost'); // connect to our database

var port     = process.env.PORT; // set our port
var app        = express();
var router = express.Router();

app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', process.env.PORT);

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Breeze 2015 API');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'Home!' }); 
});

router.route('/events')

  // add an event (accessed at POST http://localhost:8080/events)
  .post(function(req, res) {
    
    var event = new Event();    // create a new instance of the Event model
    event.name = req.body.name;  // set the event name (comes from the request)
                                //configure angular to choose from dropdown menu
    event.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Event Added!' });
    });

    
  })

  // get all the events (accessed at GET http://localhost:8080/api/events)
  .get(function(req, res) {
    Event.find(function(err, events) {
      if (err)
        res.send(err);

      res.json(events);
    });
  });

// on routes that end in /events/:event_id
// ----------------------------------------------------
router.route('/events/:event_id')

  // get the event with that id
  .get(function(req, res) {
    Event.findById(req.params.event_id, function(err, event) {
      if (err)
        res.send(err);
      res.json(event);
    });
  })

  // update the event with this id
  .put(function(req, res) {
    Event.findById(req.params.event_id, function(err, event) {

      if (err)
        res.send(err);

      event.name = req.body.name;
      event.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Event updated!' });
      });

    });
  })

  // delete the event with this id
  .delete(function(req, res) {
    Event.remove({
      _id: req.params.event_id
    }, function(err, event) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


// REGISTER OUR ROUTES
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Server Listening at  ' + port);
