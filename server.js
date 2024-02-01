var express = require("express");
var path = require("path");
const bodyParser = require('body-parser');
var app = express();


const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://Tumo:Tumo1234@cluster0.ek0rehr.mongodb.net/Tumo_product';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));

app.get("/", function (req, res) {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('products').find().toArray()
            res.render('../public/form.ejs', {
                obj: result
            });
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.post('/addName', async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const des = req.body.description;
    const uuid = req.body.uuid;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            let result = await mongoose.connection.db.collection('products').insertOne({
                name: name,
                price: price,
                image: image,
                description: des,
                uuid: uuid
            })
            res.json(result);
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.get("/delete/:id", function (req, res) {

});

app.get("/update/:id", function (req, res) {
    var id = req.params.id;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('products').findOne({uuid: id});
            res.render('../public/update.ejs', {
                obj: result
            });
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.post("/updateData", function (req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const des = req.body.description;
    const uuid = req.body.uuid;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            let result = await mongoose.connection.db.collection('products').updateOne({$or : {
                name: name,
                price: price,
                image: image,
                description: des,
                uuid: uuid
            } })
            // res.json(result);
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});




app.listen(3000, function () {
    console.log("Example is running on port 3000");
});
