import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function GrowthCurve({ plantId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from('growth_logs')
        .select('height_cm, recorded_at')
        .eq('plant_id', plantId)
        .order('recorded_at', { ascending: true });
      if (data) setLogs(data);
    };
    if (plantId) fetchLogs();
  }, [plantId]);

  return (
    <div className="chart-container">
      <h3>Growth Velocity (cm)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={logs}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="recorded_at" tickFormatter={(str) => new Date(str).toLocaleDateString()} stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
          <Line type="monotone" dataKey="height_cm" stroke="#4ade80" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GrowthCurve;