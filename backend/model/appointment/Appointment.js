import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  ClientName: {
    type: String,
    required: [true, "Please write a title for your event"],
  },
  email: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: [true, "Please Insert The Start of your event"],
    min: [new Date(), "can't be before now!!"],
  },

  end: {
    type: Date,
    // setting a min function to accept any date one hour ahead of start
    min: [
      function () {
        const date = new Date(this.start);
        const validDate = new Date(date.setHours(date.getHours() + 1));
        return validDate;
      },
      "Event End must be at least one hour ahead of event time",
    ],
    default: function () {
      const date = new Date(this.start);
      return date.setDate(date.getDate() + 1);
    },
  },
  description: { type: String },
});

const AppointMents = mongoose.model("AppointMentss", AppointmentSchema);

export default AppointMents;
