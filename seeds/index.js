const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const randomNum = Math.floor(Math.random() * 5930);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //USER ID
            author: '64a905abd8cb1332e0e574d0',
            location: `${cities[randomNum].city}, ${cities[randomNum].country}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomNum].lng,
                    cities[randomNum].lat,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dcl4f4vev/image/upload/v1688825891/YelpCamp/hoeaai9iy4udsuhzwwny.jpg',
                    filename: 'YelpCamp/hoeaai9iy4udsuhzwwny'
                },
                {
                    url: 'https://res.cloudinary.com/dcl4f4vev/image/upload/v1688825874/YelpCamp/kxucfidvxekccxkasbjx.jpg',
                    filename: 'YelpCamp/kxucfidvxekccxkasbjx'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database closed');
})