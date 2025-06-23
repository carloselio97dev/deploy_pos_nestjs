import {v2 as cloaudinary } from 'cloudinary'

export const UploadImageProvider = {

    provide:'CLOUDINARY',
    useFactory:()=>{
        return cloaudinary.config({
            cloud_name:process.env.CLAUDINARY_NAME,
            api_key:process.env.CLAUDINARY_API_KEY,
            api_secret:process.env.CLAUDINARY_API_SECRET
        })
    }
}