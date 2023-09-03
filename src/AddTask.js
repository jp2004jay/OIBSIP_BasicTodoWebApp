import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import CompletedTasks from "./CompletedTasks";
import PanddingTasks from "./PanddingTasks";
import Swal from "sweetalert2";

const AddTask = () => {
    const [data, setData] = useState({});
    const addTaskRef = collection(db, "not-completed-tasks");

    const handleAddTask = () => {
        if (data.title != null && data.description != null && data.dueDate != null) {
            const arrTemp = data.dueDate.split("-");
            const formattedDueDate = arrTemp[2] + "/" + arrTemp[1] + "/" + arrTemp[0];

            const date = new Date();
            const formattedDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/");

            addDoc(addTaskRef, { ...data, dueDate: formattedDueDate, currentDate: formattedDate })
                .then((docRef) => {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'You have successfully added the task',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        window.location.href = "http://localhost:3000/";
                    }, 1500);
                    
                })
                .catch((error) => {
                    console.error('Error adding document: ', error);
                });
        }
        else {
            alert("Please enter all fields");
        }

    }
    return (
        <div className='w-3/4 mx-auto flex flex-col gap-5 font-serif'>
            <div className='w-full text-center'>
                <h1 className="text-lime-600 text-4xl font-extrabold mb-10">Add Task</h1>
            </div>
            <label className='w-full'>
                <h1 className="text-lime-800 text-xl font-black ml-2">Title</h1>
                <input onChange={(t) => {
                    setData({ ...data, title: t.target.value })
                }} className='w-full outline-none rounded-full border-2 border-lime-200 px-5 py-2' type='text' />
            </label>
            <label className='w-full'>
                <h1 className="text-lime-800 text-xl font-black ml-2">Description</h1>
                <input onChange={(t) => {
                    setData({ ...data, description: t.target.value })
                }} className='w-full outline-none rounded-full border-2 border-lime-200 px-5 py-2' type='text' />
            </label>
            <label className='w-full'>
                <h1 className="text-lime-800 text-xl font-black ml-2">Due Date</h1>
                <input onChange={(t) => {
                    setData({ ...data, dueDate: t.target.value })
                }} className='w-full outline-none rounded-full border-2 border-lime-200 px-5 py-2' type='date' />
            </label>

            <div className='w-full text-center'>
                <button onClick={handleAddTask} className="text-lime-800 text-2xl font-extrabold mt-10 bg-lime-300 rounded-lg px-5 py-1 transition-colors duration-500 hover:bg-white hover:text-black">Submit</button>
            </div>
        </div>
    )
}

export default AddTask;