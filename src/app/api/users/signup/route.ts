import {connectDatabase} from '@/dbConnection/dbconnect';
import User from '@/models/userModel'
import { error } from 'console';
import { NextResponse , NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs'
import {sendEmail} from '@/helper/mailsending'
//  datafase got connected 
connectDatabase();
// here we write thr api and import the file different from th express js

export async function POST(request: NextRequest){ // using async fxn as the databse is in another continent so it better to use async fxn 
    try {
        const reqBody = await request.json()
        // destructuring karke saman nikal lo like username , email etc...
        const {username , email , password} =  reqBody;
        // valdiationm
        console.log(reqBody);

        const user = await User.findOne({email});

        if (user) {
            return NextResponse.json({error: "User already exist"} , {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hasspassword = await bcryptjs.hash(password , salt);
        // as in the upper code we pass the password as the fost argument becox 
        // first we send the plai  texr and the salt we convert it into the hasshedpassword 

        // now modify the user

        const newUser = new User({
            username,
            email,
            password: hasspassword
        });

        const savedUser = await newUser.save();
        console.log("User saved");

        // send verification email 

        await sendEmail({email , emailtype: 'VERIFY' , userId: savedUser._id})
        // reutrn the response 
        return NextResponse.json({
            message: "User Registerd Succesfully",
            success: true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message} , {status: 500})
    }
}

