import { useState } from 'react';
import { supabase } from './supabaseClient';
import { PlusCircle } from 'lucide-react';

function AddPlant({ onPlantAdded }) {
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [datePlanted, setDatePlanted] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('plants')
      .insert([
        { 
          common_name: commonName, 
          scientific_name: scientificName, 
          date_planted: datePlanted 
        }
      ]);

    if (error) {
      alert(error.message);
    } else {
      setCommonName('');
      setScientificName('');
      setDatePlanted('');
      onPlantAdded(); // Refresh the list in App.jsx
    }
    setLoading(false);
  };

  return (
    <section className="add-plant-card">
      <h3><PlusCircle size={18} /> Register New Specimen</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Common Name (e.g. Monstera)" 
          value={commonName} 
          onChange={(e) => setCommonName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Scientific Name (e.g. Monstera deliciosa)" 
          value={scientificName} 
          onChange={(e) => setScientificName(e.target.value)} 
        />
        <input 
          type="date" 
          value={datePlanted} 
          onChange={(e) => setDatePlanted(e.target.value)} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add to Collection'}
        </button>
      </form>
    </section>
  );
}

export default AddPlant;