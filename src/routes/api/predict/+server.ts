// This is a file for making the predictions of the model.
// https://codelabs.developers.google.com/tensorflowjs-transfer-learning-teachable-machine#0


import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { put } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from "$env/static/private";



export const POST: RequestHandler = async ({ request }) => {
    console.log("Predicting...");
    const {  image, label } = await request.json();
    
    console.log("Label: ", label);

    // Decode the base64 image
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    const imageSize = buffer.length;
    console.log(`Image size: ${imageSize} bytes`);
    const { url } = await put(`${label}.png`, buffer, { 
        token: BLOB_READ_WRITE_TOKEN, 
        access: "public",
        contentType: "image/png"
    });
    console.log("URL: ", url);

    // imageData is now a string containing the decoded image data

   
    return json({
        prediction: "prediction",
    });
};
