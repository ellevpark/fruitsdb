const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = "fruitsDB";
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    insertDocuments(db, function() {
        client.close();
    })
});

const insertDocuments = function(db, callback) {
    const collection = db.collection('fruits');

    collection.insertMany([
        {
            name: 'Apple',
            score: 8,
            review: "crunchy & nice"
        }, 
        {
            name: 'Strawberry',
            score: 10,
            review: "tart and sweet"
        }, 
        {
            name: "Banana",
            score: 9,
            review: "very common and always good"
        }

    ], function(err, result) {
        assert.equal(err,null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    })
}