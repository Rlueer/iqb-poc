import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import api from "../api/axios";

export default function StudentCreate() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        gsmNumber: "",
        number: ""
    });

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const submitStudent = async (e) => {
        e.preventDefault();

        try {
            await api.post("/students", form);
            navigate("/students");
        } catch (err) {
            if (err.response && err.response.data) {
                const errors = err.response.data;
                let msg = Object.values(errors).join("\n");
                alert(msg);
            } else {
                alert("Server error");
            }
        }
    };

    return (
        <div className="container mt-4">
            <Link to={`/students`} className="btn btn-link">
                ← Back to Students
            </Link>
            <h2>Add New Student</h2>

            <form onSubmit={submitStudent} className="mt-3">

                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">GSM Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.gsmNumber}
                        onChange={(e) => updateField("gsmNumber", e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Student Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.number}
                        onChange={(e) => updateField("number", e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Add Student
                </button>
            </form>
        </div>
    );
}
