import { useState } from 'react';
import { supabase } from './supabaseClient';
import { Camera, Save } from 'lucide-react';

function AddGrowthLog({ plantId, onLogAdded }) {
  const [height, setHeight] = useState('');
  const [status, setStatus] = useState('Healthy');
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const { error } = await supabase
      .from('growth_logs')
      .insert([{ 
        plant_id: plantId, 
        height_cm: parseFloat(height), 
        health_status: status, 
        notes: notes 
      }]);

    if (!error) {
      setHeight('');
      setNotes('');
      onLogAdded();
    }
    setUploading(false);
  };

  return (
    <form className="growth-form" onSubmit={handleSubmit}>
      <h3>New Research Entry</h3>
      <input type="number" step="0.1" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Excellent">Excellent</option>
        <option value="Healthy">Healthy</option>
        <option value="Stressed">Stressed</option>
        <option value="Dormant">Dormant</option>
      </select>
      <textarea placeholder="Observation notes..." value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit" disabled={uploading}><Save size={16} /> {uploading ? 'Saving...' : 'Save Log'}</button>
    </form>
  );
}

export default AddGrowthLog;