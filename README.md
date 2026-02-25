BioTrack: Botanical Growth & Data Persistence System

BioTrack is a full-stack scientific application designed to bridge the gap between botanical research and modern data engineering. It moves beyond simple data fetching to implement a robust CRUD (Create, Read, Update, Delete) architecture, allowing for the persistent tracking of plant specimens over time.

🌿 The Intersection of Botany & Engineering
Leveraging my background in scientific and nature research, I built this system to digitize the manual logging process often found in ecological forecasting. The application demonstrates proficiency in managing both Structured Data (growth metrics in PostgreSQL) and Unstructured Data (specimen photography in Cloud Storage).

🛠️ Technical Specifications
Database: PostgreSQL (via Supabase) utilizing relational schemas to link plant species to time-series growth logs.

Storage: Integrated Supabase Buckets for binary large object (BLOB) management of specimen images.

Analytics: Real-time growth curve generation using Recharts to visualize height velocity over time.

Frontend: React 18 with a focus on asynchronous state synchronization and defensive programming.

📊 Data Architecture
The system relies on a One-to-Many relational model:

Plants Table: Stores primary identifiers including common_name and scientific_name.

Growth_Logs Table: Acts as a time-series ledger, using plant_id as a Foreign Key to maintain data integrity across measurements.

🚀 Key Features
Persistent Tracking: Unlike standard frontend apps, data is persisted in a cloud-hosted PostgreSQL instance, ensuring records survive session resets.

Scientific Precision: Inputs are validated for numerical precision (cm) to satisfy the requirements of peer-reviewed research.

Cloud Gallery: A dedicated gallery view that maps relational log data to physical assets stored in cloud buckets.

⚙️ Installation & Setup
Clone the Repository:

Bash
git clone https://github.com/YourUsername/my-botanical-tracker.git
Install Dependencies:

Bash
npm install
Configure Environment:
Create a .env file on your MacBook Pro and add your Supabase credentials:

Bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
Run Development Server:

Bash
npm run dev
📜 License
Distributed under the MIT License.