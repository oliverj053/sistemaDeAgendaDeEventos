import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import { getMessagesES, localizer } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';



export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const {user}= useAuthStore()
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent,startLoadingEvents } = useCalendarStore();

  const eventPropGetter = (event, starty, end, isSelectd) => {
    // console.log(event, starty, end, isSelectd);

    const isMyEvent= (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: (isMyEvent) ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: '0.8',
      color: 'white'
    }

    return {
      style
    }
  }

  const onDubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event)
  }

   useEffect(() => {      
      startLoadingEvents();
  }, [])
  


  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventPropGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
