import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState("");

    const loadStudents = async () => {
        try {
            const res = await api.get("/students");
            setStudents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const searchStudents = async () => {
        if (query.trim() === "") {
            loadStudents();
            return;
        }

        try {
            const res = await api.get(`/students/search?q=${query}`);
            setStudents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteStudent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            await api.delete(`/students/${id}`);
            loadStudents();
        } catch (err) {
            console.error(err);
            alert("Error deleting student.");
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-link">
                ← Back to HomePage
            </Link>

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
                    <th style={{ width: "200px" }}>Actions</th>
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
                            <Link
                                to={`/students/${s.id}`}
                                className="btn btn-sm btn-info me-2"
                            >
                                Details
                            </Link>

                            <Link
                                to={`/students/${s.id}/edit`}
                                className="btn btn-sm btn-warning me-2"
                            >
                                Edit
                            </Link>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteStudent(s.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
