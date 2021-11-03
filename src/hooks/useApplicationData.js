import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({...prev, days, appointments, interviewers }));
    })
  }, [])

  const setDay = day => setState({...state, day});

  const updateSpots = function (state, appointments, id) {

    const index = state.days.findIndex(d => d.name === state.day)
    const day = state.days[index]
    let spots = 0;
  
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if(!appointment.interview) {
        spots++
      }
    }
  
    const newDay = {...day, spots };
    const newDays = state.days.map(d => d.name === state.day ? newDay : d);
  
    return newDays;
  };

  function bookInterview(id, interview) {
    console.log("BOOK INTERVIEW:", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview}) //makes this async
    .then(res => {
      setState({ ...state, appointments});
    })
    .then(() => axios.get('/api/days'))
    .then(res => {
      setState(prev => ({...prev, days: res.data}))
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({ ...state, appointments});
    })
    .then(() => axios.get('/api/days'))
    .then(res => {
      setState(prev => ({...prev, days: res.data}))
    });
  }


  return {state, setDay, bookInterview, cancelInterview}
}