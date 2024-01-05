import { Schema, model, Document } from "mongoose";

const publication_schema = new Schema({
    _id: String,
    text: String,
    image: String,
    nit_company: String,
    image_url: String,
    secure_url: String,
    public_id: String
});

export interface IPublication extends Document {
    _id: string,
    text: string,
    image: string,
    nit_company: string,
    image_url: string,
    secure_url: string,
    public_id: string
}

export default model<IPublication>('Publication', publication_schema);