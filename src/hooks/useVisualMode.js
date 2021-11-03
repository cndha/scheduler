import { useState } from 'react';

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //set history as an array

  function transition(newMode, replace = false) {
    setMode(newMode); 
    setHistory(current => replace ? ([...current.slice(0, -1), newMode]) : ([...current, newMode]));
  };

  function back() {
    history.length > 1 && history.pop(); //constraint, can't go back past initial mode
    setMode(history.slice(-1)[0]); //"take off" the latest mode, to get the previous mode, set mode with last item in the array
  }

  return {mode, transition, back };
}