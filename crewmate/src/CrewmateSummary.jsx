// CrewmateSummary.js
import { useState, useEffect } from 'react';
import { supabase } from './client';
import { Link } from 'react-router-dom';

function CrewmateSummary() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    async function fetchCrewmates() {
      const { data } = await supabase.from('crewmates').select('*');
      setCrewmates(data);
    }
    fetchCrewmates();
  }, []);

  async function handleDelete(id) {
    // Confirm deletion with the user
    if (window.confirm('Are you sure you want to delete this crewmate?')) {
      await supabase.from('crewmates').delete().eq('id', id);
      // Refresh the list of crewmates
      const { data } = await supabase.from('crewmates').select('*');
      setCrewmates(data);
    }
  }

  return (
    <div>
      <h1>Crewmate Summary</h1>
      {crewmates.map((crewmate) => (
        <div key={crewmate.id}>
          <h2>{crewmate.name}</h2>
          <p>Speed: {crewmate.speed} mph</p>
          <p>Color: {crewmate.color}</p>
          <Link to={`/crewmates/${crewmate.id}`}>View Details</Link>
          <Link to={`/crewmates/${crewmate.id}/edit`}>Edit</Link>
          <button onClick={() => handleDelete(crewmate.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default CrewmateSummary;
