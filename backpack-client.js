var MongoClient = require('mongodb').MongoClient;

module.exports = function (context, done) {
  var url = context.secrets.MONGO_URL,
      collection = context.secrets.MONGO_COLLECTION;

  MongoClient.connect(url, function (err, db) {
    if (context.data.page && context.data.limit) {
      db.collection(collection)
        .find()
        .sort({ $natural: -1 })
        .skip((context.data.page - 1) * context.data.limit)
        .limit(context.data.limit)
        .toArray(function(err, documents) {
          if (err) return done(err);

          done(null, documents);
        });
    } else {
      db.collection(collection)
        .find()
        .sort({ $natural: -1 })
        .limit(15)
        .toArray(function(err, documents) {
          if (err) return done(err);

          done(null, documents);
        });
    }
  });
};
