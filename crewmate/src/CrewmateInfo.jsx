// CrewmateInfo.js
import { useState, useEffect } from 'react';
import { supabase } from './client';
import { useParams } from 'react-router-dom';

function CrewmateInfo() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    async function fetchCrewmate() {
      const { data } = await supabase.from('crewmates').select('*').eq('id', id).single();
      setCrewmate(data);
    }
    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <div>Loading...</div>;

  return (
    <div>
      <h1>{crewmate.name}</h1>
      <p>Speed: {crewmate.speed} mph</p>
      <p>Color: {crewmate.color}</p>
    </div>
  );
}

export default CrewmateInfo;
