import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PanddingTasks = () => {
    const panddingTasksRef = collection(db, "not-completed-tasks");
    const addTaskRef = collection(db, "completed-tasks");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDocs(panddingTasksRef).then((response) => {
            var arrTemp = [];
            response.forEach((doc) => {
                arrTemp.push({ ...doc.data(), id: `${doc.id}` });
            });
            return arrTemp;
        }).then((rec) => {
            setData(rec);
        });
    }, [])

    const handleCommit = (id) => {

        const docRef = doc(db, "not-completed-tasks", id);

        getDoc(docRef).then((doc) => {
            if (doc.exists) {
                return doc.data();
            }
        }).then((rec) => {
            addDoc(addTaskRef, rec)
                .then((docRef) => {
                    console.log("SUCCESSFUL");
                })
                .then((res) => {
                    deleteDoc(docRef).then((res) => {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'You have successfully completed the task.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            navigate("/completed");
                        }, 1500);
                    })
                });
        })
    }
    return (
        <>
            <div className='w-[90%] my-5 text-right'>
                <Link to="/completed">
                    <button className='bg-blue-400 rounded-full text-white text-lg px-5 py-2 border-2 border-white transition-colors duration-1000 hover:border-blue-500 hover:bg-white hover:text-black'>Go to Completed Tasks</button>
                </Link>
            </div>
            <div className='w-[90%] mt-12 overflow-y-auto'>
                <button className='bg-lime-500 rounded-lg text-white text-lg px-3 py-1'>
                    Pandding Tasks</button>
                <table cellPadding="3" className='w-full'>
                    <tr>
                        <th className="border-2 border-lime-100">Task</th>
                        <th className="border-2 border-lime-100">Description</th>
                        <th className="border-2 border-lime-100">Entry Date</th>
                        <th className="border-2 border-lime-100">Due Date</th>
                        <th className="border-2 border-lime-100"></th>
                    </tr>

                    {
                        data.map((doc) => {
                            return (
                                <>
                                    <tr>
                                        <td className="border-2 border-lime-100">{doc.title}</td>
                                        <td className="border-2 border-lime-100">{doc.description}</td>
                                        <td className="border-2 border-lime-100">{doc.currentDate}</td>
                                        <td className="border-2 border-lime-100">{doc.dueDate}</td>
                                        <td className="border-2 border-lime-100 text-center align-middle">
                                            <button onClick={() => {
                                                handleCommit(doc.id);
                                            }}>
                                                <AiFillCheckCircle className="w-8 h-8 text-blue-400" />
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}

export default PanddingTasks;