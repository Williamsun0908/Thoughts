import mongoose from "mongoose";

const writingSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true
        },

        summary : {
            type: String,
            required: true
        },

        content : {
            type: String,
            required: true
        },

        googleId : {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        avatar: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        }

    },

    // createdAt, updatedAt
    { timestamps : true }
)

writingSchema.index(
  { title: 'text', summary: 'text', content: 'text' },
  { default_language: 'english' }
);

export default mongoose.model("writing", writingSchema)