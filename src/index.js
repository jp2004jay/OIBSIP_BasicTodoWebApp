import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CompletedTasks from './CompletedTasks';
import PanddingTasks from './PanddingTasks';
import AddTask from './AddTask';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div className='flex w-full flex-wrap'>

      <div className='w-full md:w-3/4 flex flex-col flex-wrap items-center font-serif'>
        <div className='w-full text-center py-12 font-bold text-5xl text-lime-800'>
          Daily Tasks
        </div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element = {<PanddingTasks/>}/>
            <Route path='/completed' element={<CompletedTasks/>}/>
          </Routes>
        </BrowserRouter>
      </div>

      <div className='w-[90%] sm:w-1/2 md:w-1/4 relative px-4 py-8 rounded-lg my-16 md:my-0 md:rounded-none md:p-0 md:fixed md:h-[100vh] mx-auto right-0 h-auto bg-lime-100 flex items-center'>
        <AddTask />
      </div>
    </div>
  </>
);
