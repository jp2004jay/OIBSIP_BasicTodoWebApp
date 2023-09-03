import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CompletedTasks = () => {
    const completedTaskRef = collection(db, "completed-tasks");
    const [data, setData] = useState([]);

    useEffect(() => {
        getDocs(completedTaskRef).then((response) => {
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
        const docRef = doc(db, "completed-tasks", id);
        deleteDoc(docRef).then((res) => {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'The deletion was successful',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                window.location.href = "http://localhost:3000/completed";
            }, 1500);
        }).catch((err) => {
            console.log(err);
        })

    }
    return (
        <>
            <div className='w-[90%] my-5 text-right'>
                <Link to="/">
                    <button className='bg-lime-500 rounded-full text-white text-lg px-5 py-2 border-2 border-white transition-colors duration-1000 hover:border-lime-500 hover:bg-white hover:text-black'>
                        Go to Pandding Tasks
                    </button>
                </Link>
            </div>
            <div className='w-[90%] mt-12  overflow-y-auto'>
                <button className='bg-blue-400 rounded-lg text-white text-lg px-3 py-1'>Completed Tasks</button>
                <table cellPadding="3" className='w-full'>

                    <tr>
                        <th className="border-2 border-blue-100">Task</th>
                        <th className="border-2 border-blue-100">Description</th>
                        <th className="border-2 border-blue-100">Entry Date</th>
                        <th className="border-2 border-blue-100">Due Date</th>
                        <th className="border-2 border-blue-100"></th>
                    </tr>

                    {
                        data.map((doc) => {
                            return (
                                <>
                                    <tr>
                                        <td className="border-2 border-blue-100">{doc.title}</td>
                                        <td className="border-2 border-blue-100">{doc.description}</td>
                                        <td className="border-2 border-blue-100">{doc.currentDate}</td>
                                        <td className="border-2 border-blue-100">{doc.dueDate}</td>
                                        <td className="border-2 border-blue-100 text-center align-middle">
                                            <button onClick={() => {
                                                handleCommit(doc.id);
                                            }}>
                                                <AiFillCloseCircle className="w-8 h-8 text-red-400" />
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

export default CompletedTasks;