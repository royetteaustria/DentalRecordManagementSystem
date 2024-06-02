import { AdvancedCalendar } from "./components"
import { Link } from "react-router-dom"

const Appointment = () => {
  return (
    <>
    <div className="dark:text-white">
      <div className="flex justify-end m-4">
        <button className="bg-brand-500 h-12  w-[150px] text-white rounded-lg px-2">
          <Link to='/admin/addAppointment'>Add appointment</Link>
        </button>
      </div>
      <div style={{ height: "95vh" }} className="p-4 dark:text-white">
        <AdvancedCalendar/>
      </div>
    </div>
    </>
  )
}

export default Appointment