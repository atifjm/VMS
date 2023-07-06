import User from "../models/User.js"
import Vehicle from "../models/Vehicle.js"

//ADDING NEW RECORD 
export const addNewRecord = async(req,res) => {
    try {
        const newRecord = new Vehicle(req.body)
        const savedRecord = await newRecord.save()
        res.status(201).send({success:true, message: "Record added successfully"})
        
    } catch (err) {
        console.log(err)
        res.status(500).send({success:false, message: `Error in adding new record`, err})
    }
}

//GETTING ALL RECORDS BY USER
export const getAllRecords = async (req,res) => {
    try {
            const records = await Vehicle.find( { userId: req.params.id})
            //res.status(201).send({success:true, message: "Records fetched successfully", records})
            res.status(201).json(records)
        } 
        catch (err) {
        console.log(err)
        res.status(500).send({success:false, message: `Error in fetching record`, err})
    }
}

//GETTING SINGLE RECORD
export const getRecord = async(req,res) => {
    try {
        const record = await Vehicle.find({ _id: req.params.id })
        res.status(201).json(record)

    } catch (err) {
        console.log(err)
        res.status(500).send({success: false, message: `Error in fetching record`, err})        
    }
}

//DELETING RECORDS
export const deleteRecord = async (req,res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id)
        res.status(201).send({success:true, message: "Record deleted successfully"}) 
    } catch (err) {
        console.log(err)
        res.status(500).send({success: false, message: `Error in deleting record`, err}) 
    }
}

//UPDATING RECORDS
export const editRecord = async (req,res) => {
    try {
        const updatedRecord = await Vehicle.findByIdAndUpdate( req.params.id, { $set: req.body }, { new: true })
        res.status(201).send({success:true, message: "Record updated successfully"})        
    } catch (err) {
        console.log(err)
        res.status(500).send({success: false, message: `Error in updating record`, err})
    }
}


