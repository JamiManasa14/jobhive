import mongoose from "mongoose";

const jobSchema  = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    requirements:[{
        type: String,
    }],
    salary:{
        type: Number,
        required: true
    },
    experienceLevel:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        required: true
    },
    position:{
        type: Number,
        required: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required:true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    applications:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        }
    ]
},{timestamps:true});

export const  Job = mongoose.model('Job', jobSchema);

export const updateJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, requirements, salary, experience, location, jobType, position, companyId } = req.body;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            {
                title,
                description,
                requirements: requirements.split(","),
                salary: Number(salary),
                experienceLevel: experience,
                location,
                jobType,
                position,
                company: companyId
            },
            { new: true } // Return the updated document
        ).populate("company");

        if (!updatedJob) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};
