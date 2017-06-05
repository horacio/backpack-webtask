var MongoClient = require('mongodb').MongoClient;
var _ = require('lodash');

module.exports = function (context, done) {
  var body = JSON.parse(context.body_raw);
  var highlight = _.pick(body, ['url', 'title', 'text', 'created_at'])

  MongoClient.connect(context.secrets.MONGO_URL, function (err, db) {
    db.collection(context.secrets.MONGO_COLLECTION).insert(highlight, function(err) {
      if (err) return done(err);

      done(null, 'Done.');
    });
  });
};
