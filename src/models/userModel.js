import exp from 'constants';
import { verify } from 'crypto';
import mongoose from 'mongoose';
import { PassThrough } from 'stream';

const userSchema = new mongoose.Schema({
    username: {
        typeof: String,
        required: [ true , 'Please enter a username'],
        unique: true
    },
    email: {
        typeof: String,
        required: [ true , 'Please enter a email'],
        unique: true
    },
    password: {
        typeof: String,
        required: [ true , 'Please enter a password'],
    },
    isverified: {
        typeof: String,
        default: false
    },
    isAdmin: {
        typeof: String,
        default: false
    },
    frogetPasswordToken: String,
    frogetPasswordTokenExpi: Date,
    verifyToken : String,
    verifyTokenExpi: Date


});


const User = mongoose.models.users || mongoose.model("users" , userSchema);

export default User;