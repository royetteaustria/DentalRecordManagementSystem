import handleEventErrors from "../../utils/Appointment/AppointmentHandleError.js";
import AppointMents from "../../model/appointment/Appointment.js";

const listOfAppointments = async(req ,res) =>{

    const events = await AppointMents.find({});
 
    try{
       res.status(200).json(events)
    }catch(err){
        handleEventErrors(err, res)
    }
};

const getAppointments = async(req, res)=>{
    const id =   req.params.id
    const event = await AppointMents.findById(id);
 
    try{
       res.status(200).json(event)

      
    }catch(err){
        handleEventErrors(err, res)
    }
};

const addAppointment = async (req, res) => {
    try {
        const newEvent = await AppointMents.create(req.body);
        res.status(200).json(newEvent);
    } catch (err) {
        handleEventErrors(err, res);
    }
};


const EditAppointment =  async (req, res) => {
    const id = req.params.id;
    try {
        const updatedEvent = await AppointMents.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(updatedEvent);
    } catch (err) {
        handleEventErrors(err, res);
    }
};

const deleteAppointment = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEvent = await AppointMents.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json("Event has been deleted");
    } catch (err) {
        handleAppoinmentErrors(err, res);
    }
};

export {
    addAppointment,
    listOfAppointments,
    deleteAppointment,
    EditAppointment,
    getAppointments
}