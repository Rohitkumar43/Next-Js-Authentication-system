import exp from 'constants';
import { verify } from 'crypto';
import mongoose from 'mongoose';
import { PassThrough } from 'stream';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true , 'Please enter a username'],
        unique: true
    },
    email: {
        type: String,
        required: [ true , 'Please enter a email'],
        unique: true
    },
    password: {
        type: String,
        required: [ true , 'Please enter a password'],
    },
    isverified: {
        type: String,
        default: false
    },
    isAdmin: {
        type: String,
        default: false
    },
    frogetPasswordToken: String,
    frogetPasswordTokenExpi: Date,
    verifyToken : String,
    verifyTokenExpi: Date


});

const User = mongoose.models.users || mongoose.model("users" , userSchema);

export default User;