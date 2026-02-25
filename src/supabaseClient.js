import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


const addPlant = async (commonName, scientificName, datePlanted) => {
  const { data, error } = await supabase
    .from('plants')
    .insert([
      { 
        common_name: commonName, 
        scientific_name: scientificName, 
        date_planted: datePlanted 
      },
    ]);

  if (error) {
    console.error('Error adding plant:', error.message);
  } else {
    console.log('Plant added successfully:', data);
  }
};

export default addPlant;    
