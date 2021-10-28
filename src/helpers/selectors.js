
export function getAppointmentsForDay(state, day) {
  const filter = state.appointments.filter(id => id.day === id);
  return filter;
}