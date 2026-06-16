const mongoose = require('mongoose');

const User = require('./model/userModel');

mongoose.connect('mongodb+srv://articstark1512_db_user:AwJiqf6zLsFUUQTd@mogodbwithyash.52qw2an.mongodb.net/?appName=mogodbwithYash').then(() => {
    console.log("database connected sucessfully!");
}).catch(() => {
    console.log("Issue connecting the database!");

})


// const user = new User({
//     name: "Stark",
//     age: 24,
// })

// user.save().then(() => {
//     console.log("user saved sucessfully");
// })


async function runsave() {

    // const userdata = await user.save()
    // console.log("User Saved Sucessfully", userdata);

    // another way of doing the same is 

    const newUser = await User.create({
        name: "Barron H Fedrick",
        age: 25
    })
    console.log("New user data added sucessfully", newUser);


}

runsave();