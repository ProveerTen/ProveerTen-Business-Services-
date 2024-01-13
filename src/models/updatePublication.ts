import { Schema, model, Document } from "mongoose";


const updateDataPub_schema = new Schema({
    text: String,
});
export interface IupdateDataPub extends Document {
    text: string,
}


    // model<IupdateDataPub>('dataPublication', updateDataPub_schema);