const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useUnifiedTopology: true },  { useNewUrlParser: true })

const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "Apple",
    score: 8,
    review: "crunchy & nice"
})

const kiwi = new Fruit({
    name: "Kiwi",
    score: 7,
    review: "Good but can be sour"
});

const strawberry = new Fruit({
    name: "Strawberry",
    score: 10, 
    review: "Tart but still sweet"
});

const banana = new Fruit({
    name: "Banana",
    score: 9,
    review: "Very versatile"
});

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number
})
const Person = mongoose.model("Person", personSchema);

const person = new Person ({
    name: "Adam", 
    age: 25
})

// person.save()

// fruit.save();

Fruit.insertMany([kiwi, strawberry, banana], function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Successfully saved all fruits to fruitsDB")
    }
})

Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err)
    } else {  
        mongoose.connection.close();
        fruits.forEach(fruit => {
            console.log(fruit.name)
     });
    }
});