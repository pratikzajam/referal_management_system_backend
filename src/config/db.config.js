import mongoose from 'mongoose';

let connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("DB Connected Sucessfully")
    } catch (error) {
        console.log("Something went wrong",error)
        process.exit(1)
    }
}

export default connectDb