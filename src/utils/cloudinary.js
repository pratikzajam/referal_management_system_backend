import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

console.log(process.env.APIKEY)

cloudinary.config({
    cloud_name: "du1rk8fmz",
    api_key: "483337478714148",
    api_secret: "iIHCA9ermwRykrFWenPUuC0yHiI"
});


const uploadOnCloudinary = async (localFilePath) => {
    try {


        if (!localFilePath) {

            console.log("getting null")
            return null
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "raw",
             type: "authenticated",
        })

        console.log(response)

        console.log("File is uploaded on cloudinary", response.secure_url)

        return response

    } catch (error) {
        console.log(error.message)
        fs.unlinkSync(localFilePath)  
    }
}



export { uploadOnCloudinary }


