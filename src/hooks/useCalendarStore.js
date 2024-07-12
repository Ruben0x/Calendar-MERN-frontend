import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store/calendar/calendarSlice';
import calendarApi from '../api/calendarApi';
import { convertEventsDates } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //actualizando

        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      const { data } = await calendarApi.post('/events', calendarEvent);

      dispatch(
        onAddNewEvent({ ...calendarEvent, id: data.eventoGuardado.id, user })
      );
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data?.msg, 'error');
    }
  };

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error.message);
      Swal.fire('Error al elmininar', error.response.data.msg, 'error');
    }
  };
  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('events');

      const events = convertEventsDates(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('Error cargando eventos', error.message);
    }
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    hasEventSelected: !!activeEvent,
    startLoadingEvents,
  };
};
