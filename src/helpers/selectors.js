export function getAppointmentsForDay(state, daySelected) {

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
};

export function getInterview(state, interview) {

  const result = {student: null, interview: null}; 

  if (interview) {
    result.student = interview.student;
    
    for (let interviewer in state.interviewers) {
      if(state.interviewers[interviewer].id === interview.interviewer) {
        result.interviewer = state.interviewers[interviewer];
      }
    }
    return result;
  }

  return null;
};

export function getInterviewersForDay(state, daySelected) {
  let results = [];

  const filteredDay = state.days.filter(day => day.name === daySelected);

  if(filteredDay[0] === undefined){
    return [];
  }

  for(let interviewer of filteredDay[0].interviewers){
    let object={};
    object.id=interviewer;
    object.name=state.interviewers[interviewer].name;
    object.avatar=state.interviewers[interviewer].avatar;
    results.push(object);
  } 

  return results;
};