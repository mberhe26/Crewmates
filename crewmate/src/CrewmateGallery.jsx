// import { useState, useEffect } from 'react';
// import { supabase } from './client';

// function CrewmateGallery() {
//   const [crewmates, setCrewmates] = useState([]);

//   useEffect(() => {
//     async function fetchCrewmates() {
//       const { data, error } = await supabase.from('crewmates').select('*');
//       if (error) {
//         console.error(error);
//       } else {
//         setCrewmates(data);
//       }
//     }
//     fetchCrewmates();
//   }, []);

//   return (
//     <div>
//       <h2>Crewmate Gallery</h2>
//       {crewmates.length === 0 ? (
//         <p>Empty Crewmate Gallery: You haven't created any crewmates yet.</p>
//       ) : (
//         <div>
//           <p>Populated Crewmate Gallery:</p>
//           {crewmates.map((crewmate) => (
//             <div key={crewmate.id} className="crewmate-card">
//               <h3>{crewmate.crewmate_name}</h3>
//               <p>Speed: {crewmate.speed} mph</p>
//               <p>Color: {crewmate.color}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CrewmateGallery;
import { useState, useEffect } from 'react';
import { supabase } from './client';
import { Link } from 'react-router-dom';

function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    async function fetchCrewmates() {
      const { data, error } = await supabase.from('crewmates').select('*');
      if (error) {
        console.error(error);
      } else {
        setCrewmates(data);
      }
    }
    fetchCrewmates();
  }, []);

  const deleteCrewmate = async (id) => {
    try {
      const { error } = await supabase.from('crewmates').delete().eq('id', id);
      if (error) {
        console.error(error);
      } else {
        const updatedCrewmates = crewmates.filter((crewmate) => crewmate.id !== id);
        setCrewmates(updatedCrewmates);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCrewmate = async (crewmate) => {
    try {
      const { error } = await supabase
        .from('crewmates')
        .update({
          crewmate_name: crewmate.crewmate_name,
          speed: crewmate.speed,
          color: crewmate.color,
        })
        .eq('id', crewmate.id);
  
      if (error) {
        console.error(error);
      } else {
        // Update the crewmates state with the updated crewmate
        const updatedCrewmates = crewmates.map((c) =>
          c.id === crewmate.id
            ? { id: c.id, crewmate_name: crewmate.crewmate_name, speed: crewmate.speed, color: crewmate.color }
            : c
        );
        setCrewmates(updatedCrewmates);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <h2>Crewmate Gallery</h2>
      {crewmates.length === 0 ? (
        <p>Empty Crewmate Gallery: You haven't created any crewmates yet.</p>
      ) : (
        <div>
          <p>Populated Crewmate Gallery:</p>
          <CrewmateSummary crewmates={crewmates} deleteCrewmate={deleteCrewmate} updateCrewmate={updateCrewmate} />
        </div>
      )}
    </div>
  );
}

function CrewmateSummary({ crewmates, deleteCrewmate, updateCrewmate }) {
  return (
    <div className="crewmate-summary">
      <h2>Summary Page</h2>
      <div className="crewmate-cards">
        {crewmates.map((crewmate) => (
          <div key={crewmate.id} className="crewmate-card">
            <h3>
              <Link to={`/crewmate/${crewmate.id}`}>{crewmate.crewmate_name}</Link>
            </h3>
            <p>Speed: {crewmate.speed} mph</p>
            <p>Color: {crewmate.color}</p>
            <div className="crewmate-actions">
              <button onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
              <button onClick={() => updateCrewmate(crewmate)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrewmateGallery;