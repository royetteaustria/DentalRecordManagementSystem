import { addAppointment,
    listOfAppointments,
    deleteAppointment,
    EditAppointment,
    getAppointments } from "../../controller/Appointment/Appointment.js";
import express from 'express'

const router = express.Router()

router.get("/", listOfAppointments)
router.get("/:id", getAppointments)
router.delete("/delete/:id", deleteAppointment)
router.post("/", addAppointment)
router.put("/:id", EditAppointment)

export default router;