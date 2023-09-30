import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required: [true,"please provide your name"],
    },
    email:{
        type:String,
        required: [true,"please provide your email address"],
        unique:[true,"This email address already exist"],
        lowercase:true,
        validate:[validator.isEmail,"please provide a valid email address"],
    },
    picture:{
        type:String,
        default:"../default-image.png",
    },
    status:{
        type:String,
        default: "HEy there I am using whatsapp",
    },
    password:{
        type:String,
        required: [true,"please provide your password"],
        minLength:[6,"please make sure your password length is minium 6 character"],
        maxLength:[128,"please make sure your password  is less than 128 character"],

    },
},{
    collection:"users",
    timestamps:true,
})

userSchema.pre('save',async function(next){
    try {
        if(this.isNew){
            const salt=await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(this.password,salt);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
})



const UserModel = mongoose.models.UserModel || mongoose.model("UserModel",userSchema);

export default UserModel;

























// import mongoose from "mongoose";
// import validator from "validator";


// const userSchema=mongoose.Schema({
//     name:{ 
//         type: String,
//         required: [true,"please provide your name"],
//     },
//     email:{
//         type: String,
//         required: [true,"please provide your email"],
//         unique: [true,"this email adress already exist"],
//         lowercase: true,
//         validate: [validator.isEmail, "please provide a valid email address"]
//     },
//     picture: {
//         type: String,
//         default: "../default-image.png"
//     },
//     status: {
//         type: String,
//         default: "hey there i am using whatsapp",

//     },
//     password: {
//         type: String,
//         required: [true,"please provide your password"],
//         minLength:[6, "please makesure your password is at least 6 characters long"],
//         maxLength:[128, "please makesure your password is max 128 characters long"],
//     },
// },{
//     collection: "users",
//     timestamps: true,
// })


// const UserModel = mongoose.models.UserModel || mongoose.model("UserModel",userSchema);

// export default UserModel;