import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import useFormatDateAndTime from 'hooks/Date/useDateAndTimeFormat'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function AppointmentModal( {event, onClose, onDeleteEvent} ) {
  const navigate = useNavigate()
  async function handleDeleteEvent() {
    try {
      await axios.delete(`http://localhost:4000/api/AppointmentRoutes/delete/${event._id}`);
      toast.success('Successfully deleted');
      onDeleteEvent(event._id);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }
  const UpdateEvent = () => {
    navigate(`/admin/updateAppointment/${event._id}`);
  }
  const {date} = useFormatDateAndTime()
  return (
    <Transition show={!!event}>
      <Dialog className="relative z-10" onClose={onClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="mt-2 p-4">
                        <p className="text-;g text-black font-semibold py-2">
                          Appointment details
                        </p>
                        <p className='py-2'><span className='font-semibold'>Client Name</span>: {event.ClientName}</p>
                        <p className='py-2'><span className='font-semibold'>Date Appointment</span>: {date(event.start)} - {date(event.end)}</p>
                        {event.description && <p className='py-2'><span className='font-semibold'>Description</span>: {event.description}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-navy-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 sm:ml-3 sm:w-auto"
                    onClick={UpdateEvent}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleDeleteEvent}
                    data-autofocus
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm  sm:ml-3 sm:w-auto"
                    onClick={onClose}
                    data-autofocus
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}