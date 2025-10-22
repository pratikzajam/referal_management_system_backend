import Candidate from "../models/candidate.model.js"
import mongoose from "mongoose"

export let getReferedCandidates = async (req, res) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(409).json({
                status: false,
                message: "User Id Is Required",
                data: null
            })
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid User ID format",
                data: null
            });
        }


        const candidates = await Candidate.find({ refferedBy: new mongoose.Types.ObjectId(userId) });

        if (candidates.length == 0) {
            return res.status(200).json({
                status: false,
                message: "Candidate Not Found",
                data: {
                    candidates: [],
                    totalCandidates: 0
                }
            });
        } else {
            return res.status(200).json({
                status: true,
                message: "Candidate Data Fetched Sucessfully",
                data: {
                    candidates: candidates,
                    totalCandidates: candidates.length
                }
            });
        }

    } catch (error) {
        return res.status(200).json({
            status: false,
            message: error.message,
            data: null
        });
    }

}