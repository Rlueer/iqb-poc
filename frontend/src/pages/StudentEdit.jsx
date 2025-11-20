import { useEffect, useState } from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import api from "../api/axios";

export default function StudentEdit() {
    const { id } = useParams();
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

    useEffect(() => {
        api.get(`/students/${id}`)
            .then(res => setForm(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const submitUpdate = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/students/${id}`, form);
            alert("Student updated!");
            navigate("/"); // geri dön
        } catch (err) {
            console.error(err);
            alert("Error updating student.");
        }
    };

    return (
        <div className="container mt-4">
            <Link to={`/students`} className="btn btn-link">
                ← Back to Students
            </Link>
            <h2>Edit Student</h2>

            <form onSubmit={submitUpdate} className="mt-3">

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
                    Save Changes
                </button>
            </form>
        </div>
    );
}
