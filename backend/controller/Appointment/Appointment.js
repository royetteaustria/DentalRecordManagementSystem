import handleEventErrors from "../../utils/Appointment/AppointmentHandleError.js";
import AppointMents from "../../model/appointment/Appointment.js";
import nodemailer from 'nodemailer'

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

function DateAndTimeFormat(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const hours = date.getHours() % 12 || 12; // Get 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${month} ${day}, ${year} ${hours}:${minutes} ${amPm}`;
  }

const addAppointment = async (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD,
        }
      });
      const clientEmail = req.body.email;
      const nameOfClient = req.body.ClientName;
      const dateOfAppointment = req.body.start;
      const dateOfEndAppointment = req.body.end;

      var mailOptions = {
        from: 'irenedentalclinicsystem@gmail.com',
        to: clientEmail,
        subject: 'Appointment to Irene Dental Clinic',
        html: `<p>Hi ${nameOfClient}}</p>
        <p>You have an appointment to Irene Dental Clinic!.</p>
        <p>Your date of appointment is ${DateAndTimeFormat(dateOfAppointment)} to ${DateAndTimeFormat(dateOfEndAppointment)}</p>
        <p>The location of Clinic are 34MV+J5 Tanauan, Batangas</p>
        <p>Sincererly,</p> 
        <p>Irene Dental Clinic</p> 
        <p>Note: Please do not reply to this message. Replies to this message are undeliverable.</p>`
      };

    try {
        const newEvent = await AppointMents.create(req.body);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              res.json({ message: info.response, newWeddingInquiry });
            }
          });
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