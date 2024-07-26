import mongoose from 'mongoose';


// alwys keep inthe mind when you connect the database alwauys use the assync function 
export async function connectDatabase(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        // learn some event of the mongoose 

        connection.on('connected' , () => {
            console.log("MongoDb is connected succesfully");
        });

        connection.on('error' , () => {
            console.log("MongoDb is not connected");
        })

    } catch (error) {
        console.log("Something went wrong in connecting the database");
        console.log(error);
    }
}