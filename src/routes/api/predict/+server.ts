// This is a file for making the predictions of the model.
// https://codelabs.developers.google.com/tensorflowjs-transfer-learning-teachable-machine#0


import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


export const POST: RequestHandler = async ({ request }) => {
    console.log("Predicting...");
    const {  image, label } = await request.json();
    
    console.log("Label: ", label);

    // Decode the base64 image
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    // buffer is image in usable format.

   
    return json({
        prediction: "prediction",
    });
};
