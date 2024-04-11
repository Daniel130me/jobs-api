const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdBy')
    res.status(200).json({ jobs })
}

const getJob = async (req, res) => {
    const { params: { id: jobId }, user: { userId: createdBy } } = req
    const job = await Job.findOne({ _id: jobId, createdBy })
    if (!job) {
        res.status(500).json({ msg: 'Job not found try again!' })
    }
    res.status(200).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(200).json({ job })
}

const updateJob = async (req, res) => {
    const { user: { userId: createdBy }, params: { id: jobId } } = req
    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy }, 
        req.body, 
        { new: true, runValidators: true })
    if(!job) {
        res.status(500).json({ msg:'Job does not exist' })
    }
    res.status(200).json({ job })
}

const deleteJob = async (req, res) => {
    const { user: { userId: createdBy }, params: { id: jobId } } = req 
    const job = await Job.findOneAndDelete({ _id:jobId, createdBy })
    if(!job) {
        res.status(500).json({ msg:'Job does not exist' })
    }
    res.status(200).json({ job })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}