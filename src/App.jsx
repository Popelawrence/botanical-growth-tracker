import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import AddGrowthLog from './AddGrowthLog';
import GrowthCurve from './GrowthCurve';
import AddPlant from './AddPlant';
import { Leaf, PlusCircle, XCircle } from 'lucide-react';
import './App.css';

function App() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null); 
  const [view, setView] = useState('dashboard'); 
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch plants from Supabase on component mount
  const fetchPlants = async () => {
    try {
      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setPlants(data);
        // Set initial selection if none exists
        if (!selectedPlant) setSelectedPlant(data[0]); 
      }
    } catch (err) {
      console.error("Database Connection Error:", err.message);
    }
  };

  const deletePlant = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedPlant.common_name}?`)) return;

    const { error } = await supabase
      .from('plants')
      .delete()
      .eq('id', selectedPlant.id);

    if (!error) {
      setSelectedPlant(null);
      fetchPlants();
    } else {
      console.error("Error deleting plant:", error.message);
    }
  };

  useEffect(() => { fetchPlants(); }, []);

  return (
    <div className="botanical-container">
      <header className="app-header">
        <div className="logo-section">
          <h1><Leaf className="icon-green" /> BioTrack</h1>
        </div>

        <div className="header-controls">
          {/*<-- PLANT SELECTOR: Essential for dynamic multi-plant tracking --> */}
          {plants.length > 0 && (
            <select 
              className="plant-select"
              value={selectedPlant?.id || ''} 
              onChange={(e) => setSelectedPlant(plants.find(p => p.id === e.target.value))}
            >
              {plants.map(p => (
                <option key={p.id} value={p.id}>{p.common_name}</option>
              ))}
            </select>
          )}

          <button className="toggle-add-btn" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? <><XCircle size={16} /> Cancel</> : <><PlusCircle size={16} /> New Plant</>}
          </button>
        </div>
      </header>

      {/* MODAL FORM: Centralized for better UX, appears over content when adding new plant */  }
      {showAddForm && (
        <div className="modal-overlay">
          <AddPlant onPlantAdded={() => {
            fetchPlants();
            setShowAddForm(false);
          }} />
        </div>
      )}

      {selectedPlant ? (
        <main className="main-content">
          <div className="hero">
            <h2>{selectedPlant.common_name} <span className="scientific-name">({selectedPlant.scientific_name})</span></h2>
            <nav className="view-toggle">
              <button className={view === 'dashboard' ? 'active' : ''} onClick={() => setView('dashboard')}>Logs</button>
              <button className={view === 'analytics' ? 'active' : ''} onClick={() => setView('analytics')}>Analytics</button>
            </nav>
          </div>

          <div className="display-area">
            {view === 'dashboard' ? (
              <AddGrowthLog plantId={selectedPlant.id} onLogAdded={fetchPlants} />
            ) : (
              <GrowthCurve plantId={selectedPlant.id} />
            )}
          </div>
          <div className="delete-section">
            <button className="delete-btn" onClick={deletePlant}>
              Archive Specimen
            </button>
          </div>
        </main>
      ) : (
        <div className="empty-state">
          <p>No specimens found. Click "New Plant" to begin your research.</p>
        </div>
      )}
    </div>
  );
}

export default App;