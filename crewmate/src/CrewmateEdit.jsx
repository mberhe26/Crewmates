// CrewmateEdit.js
import { useState, useEffect } from 'react';
import { supabase } from './client';
import { useParams, useNavigate } from 'react-router-dom';

function CrewmateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmateName, setCrewmateName] = useState('');
  const [crewmateAttributes, setCrewmateAttributes] = useState({
    speed: 0,
    color: '',
  });

  useEffect(() => {
    async function fetchCrewmate() {
      const { data } = await supabase.from('crewmates').select('*').eq('id', id).single();
      setCrewmateName(data.name);
      setCrewmateAttributes({ speed: data.speed, color: data.color });
    }
    fetchCrewmate();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    await supabase.from('crewmates').update({ name: crewmateName, ...crewmateAttributes }).eq('id', id);
    navigate('/crewmates');
  }

  return (
    <div>
      <h1>Edit Crewmate</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={crewmateName}
            onChange={(e) => setCrewmateName(e.target.value)}
          />
        </label>
        {/* Crewmate attribute inputs */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default CrewmateEdit;
