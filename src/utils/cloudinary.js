import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';





const uploadOnCloudinary = async (localFilePath) => {
    try {

        cloudinary.config({
            cloud_name: process.env.CLOUDNAME,
            api_key: process.env.APIKEY,
            api_secret: process.env.APISECRET
        });



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


