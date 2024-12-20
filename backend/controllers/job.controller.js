import { Job }  from "../models/job.model.js";
export const postJob = async (req,res) => {
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
        const userId =  req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt:-1});

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// for Job seeker
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

//for Admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, requirements, salary, experience, location, jobType, position, companyId } = req.body;

        // Check for required fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // Create an object for updates
        const updateData = {
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            experienceLevel: experience,
            location,
            jobType,
            position
        };

        // Only add company field if companyId is provided
        if (companyId) {
            updateData.company = companyId;
        }

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            updateData,
            { new: true } // Return the updated document
        ).populate("company");

        // Check if job was found
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
