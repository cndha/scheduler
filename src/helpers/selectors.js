export default function getAppointmentsForDay(state, daySelected) {

  let results = [];

  const filteredDay = state.days.filter(day => day.name === daySelected);

  if(filteredDay[0] === undefined){
    return [];
  }


  for(let appointment of filteredDay[0].appointments){
    let object={};
    object.id=appointment;
    object.time=state.appointments[appointment].time;
    object.interview=state.appointments[appointment].interview;
    results.push(object);
  }

  return results;
}
