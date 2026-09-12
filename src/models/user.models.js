
import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    fullName : {
        type: String,
        required: true,
        trim : true
    },

    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },

    password : {
        type : String,
        required : true
    },

    createdAt : {
        type: Date,
        default : Date.now
    },
    refreshToken : {
        type : String
    }
}, {
    timestamps: true,
});

// password incription middileware
userSchema.pre("save", async function(){

    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
})

// password matching method
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){
    
    return jwt.sign(
        {
            _id : this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){

    return jwt.sign(
        // payload
        {
            _id: this._id,
        },
        
        // secret key
        process.env.REFRESH_TOKEN_SECRET,

        // token expiry time
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)