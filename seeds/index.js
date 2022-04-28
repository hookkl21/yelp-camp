//importing
const mongoose = require("mongoose");
const cities = require("./cities");
const axios = require("axios");
//destructuring to import paces and descriptors from seedHelper file
const { places, descriptors } = require("./seedHelpers");
//.. for moving the path inorder to retrieve campground schema setting
const Campground = require("../models/campground");

main().catch((err) => {
  console.log("Oh no Mongo Error!");
  console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelpCamp");
  console.log("Mongo Connecting!");
}
//create function to pick a place/descriptor info arrays
const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function seedImg() {
  try {
    const resp = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "xlHkaH4J8tGSXwVGgney4bP7OmGALp0Qp39wMHTzUpc",
        collections: 1114848,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
}

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: "62620ea62003374c201f4028",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur tempora beatae harum culpa dolorem ut, asperiores maxime nihil, hic, repellendus minima ducimus sunt laborum suscipit. Fugit repudiandae iure ipsam.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dtdihitxs/image/upload/w_300,h_200,c_scale/v1651124969/YelpCamp/zecsitouhsrw5l8orc1l.png",
          filename: "YelpCamp/zecsitouhsrw5l8orc1l",
        },
        {
          url: "https://res.cloudinary.com/dtdihitxs/image/upload/w_300,h_200,c_scale/v1650935974/YelpCamp/tsxgazoykh1xptf9loxd",
          filename: "YelpCamp/tsxgazoykh1xptf9loxd",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
