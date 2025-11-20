import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router-dom";

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState("");

    const loadStudents = async () => {
        const res = await api.get("/students");
        setStudents(res.data);
    };

    const searchStudents = async () => {
        if (query.trim() === "") {
            loadStudents();
            return;
        }

        const res = await api.get(`/students/search?q=${query}`);
        setStudents(res.data);
    };

    useEffect(() => {
        loadStudents();
    }, []);


    return (
        <div className="container mt-4">
            <h2>Students</h2>

            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search by name, email, gsm, number..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" onClick={searchStudents}>
                    Search
                </button>
                <Link to="/students/new" className="btn btn-success ms-2">
                    + Add Student
                </Link>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>GSM</th>
                    <th>Number</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {students.map((s) => (
                    <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.fullName}</td>
                        <td>{s.email}</td>
                        <td>{s.gsmNumber}</td>
                        <td>{s.number}</td>
                        <td>
                            <Link to={`/students/${s.id}`} className="btn btn-sm btn-info">
                                Details
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
