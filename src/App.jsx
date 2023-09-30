import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-row">
      <Sidebar />
      <section className="flex flex-1">Dashboard</section>
    </div>
  );
}

export default App;
