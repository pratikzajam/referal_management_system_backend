import validator from 'validator';
import candidate from '../models/candidate.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';



export let referCandidate = async (req, res) => {
    try {
        const { candidateName, email, phoneNumber, jobTitle } = req.body;
        const { userId } = req.params;




        if (!userId) {
            return res.status(409).json({
                status: false,
                message: "User Id Is Required",
                data: null
            })
        }

        let resume = ""

        if (req.file) {


            if (req.file.mimetype != "application/pdf") {

                console.log("Type issue")
                return res.status(409).json({
                    status: false,
                    message: "Uploaded file must be type of pdf",
                    data: null
                })

            }


            const localFilePath = req.file.path;

            resume = await uploadOnCloudinary(localFilePath);

        }



        if (!candidateName || !email || !phoneNumber || !jobTitle) {
            return res.status(201).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }

        let isEmailValid = validator.isEmail(email);

        if (!isEmailValid) {

            console.log("Email issue")
            return res.status(409).json({
                status: false,
                message: "Please Enter A Valid Email",
                data: null
            })
        }

        const isMobilePhone = validator.isMobilePhone(phoneNumber, 'en-IN');

        console.log(phoneNumber)

        if (!isMobilePhone) {

            console.log("Mobile issue")
            return res.status(409).json({
                status: false,
                message: "Please Enter A Valid Mobile Phone",
                data: null
            })
        }





        let addCandidate = await new candidate({
            candidateName: candidateName,
            email: email,
            phoneNumber: phoneNumber,
            jobTitle: jobTitle,
            resume: resume.secure_url || "",
            refferedBy: userId

        }).save()


        if (addCandidate._id) {
            return res.status(201).json({
                status: true,
                message: "Candidate Added Sucessfully",
                data: null
            })
        } else {


            return res.status(500).json({
                status: false,
                message: "Something Went Wrong While Adding The Candidate",
                data: null
            })
        }

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}


export let totalReferedCounts = async (req, res) => {
    try {
        const { candidateName, email, phoneNumber, jobTitle } = req.body;
        const { userId } = req.params;

        if (!userId) {
            return res.status(409).json({
                status: false,
                message: "User Id Is Required",
                data: null
            })
        }

        if (req.file.mimetype != "application/pdf") {
            return res.status(409).json({
                status: false,
                message: "Uploaded file must be type of pdf",
                data: null
            })
        }

        const localFilePath = req.file.path;

        if (!candidateName || !email || !phoneNumber || !jobTitle) {
            return res.status(201).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }

        let isEmailValid = validator.isEmail(email);

        if (!isEmailValid) {
            return res.status(409).json({
                status: false,
                message: "Please Enter A Valid Email",
                data: null
            })
        }

        const isMobilePhone = validator.isMobilePhone(phoneNumber, 'en-IN');

        if (!isMobilePhone) {
            return res.status(409).json({
                status: false,
                message: "Please Enter A Valid Mobile Phone",
                data: null
            })
        }


        let resume = await uploadOnCloudinary(localFilePath);


        let addCandidate = await new candidate({
            candidateName: candidateName,
            email: email,
            phoneNumber: phoneNumber,
            jobTitle: jobTitle,
            resume: resume.secure_url,
            refferedBy: userId

        }).save()


        if (addCandidate._id) {
            return res.status(201).json({
                status: true,
                message: "Candidate Added Sucessfully",
                data: null
            })
        } else {
          
            console.error("Failed to add candidate:", addCandidate);

            return res.status(500).json({
                status: true,
                message: "Something Went Wrong While Adding The Candidate",
                data: null
            })
        }

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}



export const getAllCandidates = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required",
                data: null
            });
        }


        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid User ID format",
                data: null
            });
        }


        const candidates = await candidate.find({ refferedBy: new mongoose.Types.ObjectId(userId) });

        if (candidates.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No candidates found",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Candidates Fetched Successfully",
            data: candidates
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};



export let deleteCandidate = async (req, res) => {
    try {

        const { candidateId } = req.params;

        if (!candidateId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required",
                data: null
            });
        }


        if (!mongoose.Types.ObjectId.isValid(candidateId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid User ID format",
                data: null
            });
        }


        const candidates = await candidate.findOne({ _id: new mongoose.Types.ObjectId(candidateId) });

        if (!candidates) {
            return res.status(404).json({
                status: false,
                message: "No candidate found",
                data: []
            });
        }


        const deleteCandidate = await candidate.deleteOne({ _id: candidateId });

        if (deleteCandidate.deletedCount == 1) {
            return res.status(200).json({
                status: true,
                message: "Candidate Deleted Successfully",
                data: null
            });
        } else {
            return res.status(500).json({
                status: true,
                message: "Something Went Wrong While Deleteing The Candidate",
                data: null
            });
        }


    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}


export let updateCandidateStatus = async (req, res) => {
    try {

        const { candidateId } = req.params;
        const { status } = req.body;

        if (!candidateId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required",
                data: null
            });
        }

        if (!status) {
            return res.status(400).json({
                status: false,
                message: "Status Is Required",
                data: null
            });
        }


        if (!mongoose.Types.ObjectId.isValid(candidateId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid User ID format",
                data: null
            });
        }


        const candidates = await candidate.findOne({ _id: new mongoose.Types.ObjectId(candidateId) });

        if (!candidates) {
            return res.status(404).json({
                status: false,
                message: "No candidate found",
                data: []
            });
        }


        const updateCandidateStatus = await candidate.updateOne({ _id: candidateId }, { status: status });

        if (updateCandidateStatus.modifiedCount == 1) {
            return res.status(200).json({
                status: true,
                message: "Candidate Status Updated Successfully",
                data: null
            });
        } else {
            return res.status(500).json({
                status: true,
                message: "Something Went Wrong While Deleteing The Candidate",
                data: null
            });
        }


    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}



