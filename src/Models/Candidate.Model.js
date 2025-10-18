import mongoose from "mongoose";

const { Schema } = mongoose;

const candidateSchema = new Schema(
    {
        candidateName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,

        },
        phoneNumber: {
            type: String,
            required: true,

        },
        jobTitle: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Reviewed", "Hired"],
            default: "Pending",
        },
        resume: {
            type: "string"
        },
        refferedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
