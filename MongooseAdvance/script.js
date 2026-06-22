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



    //////////////////////this is create query 
    // const userdata = await user.save()
    // console.log("User Saved Sucessfully", userdata);

    // another way of doing the same is 

    // const newUser = await User.create({
    //     name: "spencer J Henry",
    //     age: 25,
    //     email: "user@email.com",
    //     hobbies: ['batmittion', 'swimming', 'reading books'],
    //     address: {
    //         city: "chennai",
    //         street: "22nd street"
    //     }
    // })
    // console.log("New user data added sucessfully", newUser);
    // // newUser.name = "michel";
    // // await newUser.save();
    // console.log(newUser);

    //////////////////this is find query 

    try {
        // const user = await User.findById('6a317fe2c22c967a9aa71ca6')
        // const user = await User.find({ email: "user@email.com" })
        // const user = await User.findOne({ email: "user@email.com" })
        // const user = await User.exists({ email: "user@email.com" })

        // these are the easy ones given by the mongoose 
        // const user = await User.where('age').gt('24').lt('26')
        // const user = await User.where('age').eq("25")
        // const user = await User.where('age').eq("25").limit(1);

        // there is another special methof populate, this brings the doc that is connected to other collection(relationship) 
        // const user = await User.where('age').eq("25").populate('bestFriend');
        const user = await User.findByName().findName('Yash');
        // user.loggingname();

        console.log(user);


    } catch (e) {
        console.log(e.message);

    }



}

runsave();