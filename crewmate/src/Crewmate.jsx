import { useState, useEffect } from 'react';
import { supabase } from './client';
import './App.css';
import crewmateImage from './assets/image3.png';
import { Link, useParams, Routes, Route } from 'react-router-dom';
import CrewmateGallery from './CrewmateGallery';

function CreateCrewmateForm({ onCreate }) {
  const [crewmateName, setCrewmateName] = useState('');
  const [crewmateAttributes, setCrewmateAttributes] = useState({
    speed: 0,
    color: '',
  });

  const handleColorChange = (color) => {
    setCrewmateAttributes({
      ...crewmateAttributes,
      color,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(crewmateName, crewmateAttributes);
    setCrewmateName('');
    setCrewmateAttributes({ speed: 0, color: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="crewmateName">Name:</label>
      <input
        type="text"
        id="crewmateName"
        value={crewmateName}
        onChange={(e) => setCrewmateName(e.target.value)}
      />

      <div>
        <label htmlFor="speed">Speed (mph):</label>
        <input
          type="number"
          id="speed"
          value={crewmateAttributes.speed}
          onChange={(e) =>
            setCrewmateAttributes({
              ...crewmateAttributes,
              speed: parseInt(e.target.value),
            })
          }
        />
      </div>

      <div>
        <label>Color:</label>
        <ul className="color-list">
          <li
            className={`color-option ${crewmateAttributes.color === 'red' ? 'selected' : ''}`}
            onClick={() => handleColorChange('red')}
          >
            Red
          </li>
          <li
            className={`color-option ${crewmateAttributes.color === 'blue' ? 'selected' : ''}`}
            onClick={() => handleColorChange('blue')}
          >
            Blue
          </li>
          <li
            className={`color-option ${crewmateAttributes.color === 'green' ? 'selected' : ''}`}
            onClick={() => handleColorChange('green')}
          >
            Green
          </li>
        </ul>
      </div>

      <button type="submit">Create Crewmate</button>
    </form>
  );
}
function Crewmate() {
  const [crewmates, setCrewmates] = useState([]);
  const [editingCrewmate, setEditingCrewmate] = useState(null);

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

  const createCrewmate = async (name, attributes) => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .insert([{ crewmate_name: name, speed: attributes.speed, color: attributes.color }]);

      if (error) {
        console.error(error);
      } else {
        console.log(data);
        setCrewmates([...crewmates, { id: data[0].id, crewmate_name: name, speed: attributes.speed, color: attributes.color }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCrewmate = async (id) => {
    try {
      const { error } = await supabase.from('crewmates').delete().eq('id', id);
      if (error) {
        handleError(error);
      } else {
        const updatedCrewmates = crewmates.filter((crewmate) => crewmate.id !== id);
        setCrewmates(updatedCrewmates);
      }
    } catch (error) {
      handleError(error);
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
        handleError(error);
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
      handleError(error);
    }
  };

  const handleUpdateCrewmate = (crewmate) => {
    setEditingCrewmate(crewmate);
  };

  const handleSaveUpdatedCrewmate = async (updatedCrewmate) => {
    await updateCrewmate(updatedCrewmate);
  };


 
  return (
    <div className="crewmate-container">
      <h1>Create a New Crewmate</h1>
      <img src={crewmateImage} alt="Image" />
      <CreateCrewmateForm onCreate={createCrewmate} />
      <Routes>
        <Route exact path="/" element={<CrewmateGallery crewmates={crewmates} deleteCrewmate={deleteCrewmate} updateCrewmate={updateCrewmate} />} />
        <Route path="/crewmate/:id" element={<CrewmateInfoPage crewmates={crewmates} />} />
        <Route path="/crewmate/:id/edit" element={<CrewmateEditForm crewmate={editingCrewmate} onSave={handleSaveUpdatedCrewmate} />} />
      </Routes>
    </div>
  );
}

function CrewmateInfo({ crewmate }) {
  return (
    <div>
      <h2>{crewmate.crewmate_name}</h2>
      <p>Speed: {crewmate.speed}</p>
      <p>Color: {crewmate.color}</p>
      {/* Add more information as needed */}
    </div>
  ); 
}
function CrewmateInfoPage({ crewmates }) {
  const { id: crewmateId } = useParams();
  const crewmate = crewmates.find((crewmate) => crewmate.id === crewmateId);

  return (
    <div>
      <h2>Crewmate Info Page</h2>
      {crewmate ? <CrewmateInfo crewmate={crewmate} /> : <p>Crewmate not found</p>}
    </div>
  );
}

function CrewmateEditForm({ crewmate, onSave }) {
  const [crewmateName, setCrewmateName] = useState(crewmate?.crewmate_name || '');
  const [crewmateAttributes, setCrewmateAttributes] = useState({
    speed: crewmate?.speed || 0,
    color: crewmate?.color || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: crewmate.id, crewmate_name: crewmateName, speed: crewmateAttributes.speed, color: crewmateAttributes.color });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}

export default Crewmate;