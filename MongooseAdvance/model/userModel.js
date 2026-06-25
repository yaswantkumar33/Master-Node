const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    city: String,
    street: String,
});

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 10,
        max: 30,
        validate: {
            validator: v => v % 2 == 0,
            message: props => `${props.value} is not a even number`
        }
    },
    email: { type: String, required: true, uppercase: true },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: Date,
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    },
    hobbies: [String],
    // address: {
    //     city: String,
    //     street: String
    // }
    // you can try this way also

    address: addressSchema,
});

// to create custom methods for your model 
userSchema.methods.loggingname = function () {
    // this will run in the instance can be used after we get the object 
    console.log("Hi the name of the user is " + this.name);
}

userSchema.statics.findByName = function () {
    return this.find()
}

userSchema.query.findName = function (uname) {
    return this.where({ name: uname })
}

userSchema.virtual("namedEmail").get(function () {
    return `${this.name} is the named email name`
})
// Schema Middleware 
userSchema.pre('save', function (next) {

    this.name = `Mr.${this.name}`;
    next;

})

// userSchema.post('save', function (doc, next) {
//     doc.name = `${doc.name} Modified!`;
//     next();
// })

const userModel = mongoose.model("user", userSchema);


module.exports = userModel;
