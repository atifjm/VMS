import express from "express"
import { addNewRecord, deleteRecord, editRecord, getAllRecords, getRecord } from "../controllers/vehicle.js"

const router = express.Router()

//ADDING NEW RECORD
router.post("/add", addNewRecord)

//GETTING DATA BY INDIVIDUAL USER 
router.get("/get-user-records/:id", getAllRecords)

//GETTING DATA BY INDIVIDUAL RECORD
router.get("/get-record/:id", getRecord)

//DELETING RECORDS
router.delete("/delete-record/:id", deleteRecord)

//UPDATING RECORDS
router.put("/edit-record/:id", editRecord)


export default router