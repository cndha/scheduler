import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const hardcode = (props.time ? `Appointment at ${props.time}` : "No appointments");
  
  return (
    <article className="appointment">
      <Header 
        time={props.time} 
      />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty/> }
    </article>
  )
}