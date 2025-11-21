import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function StudentEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ fullName: "", email: "", gsmNumber: "", number: "" });
    const [loading, setLoading] = useState(true);

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        api.get(`/students/${id}`)
            .then(res => {
                setForm(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const submitUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/students/${id}`, form);
            alert("Student updated!");
            navigate("/students");
        } catch (err) {
            console.error(err);
            alert("Error updating student.");
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center"
                 style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="text-center text-white">
                    <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }} />
                    <p className="mt-3">Loading student data...</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-vh-100 py-5 d-flex justify-content-center align-items-start"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
            <div className="container-fluid px-4 px-md-5">

                {/* CENTER WRAPPER */}
                <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>

                    {/* Back Button */}
                    <Link
                        to="/students"
                        className="btn btn-light btn-sm mb-4 shadow-sm"
                        style={{ borderRadius: '8px', fontWeight: 600 }}
                    >
                        <i className="bi bi-arrow-left me-2"></i> Back to Students
                    </Link>

                    {/* Card */}
                    <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                        <div className="card-body p-4 p-md-5">

                            {/* HEADER */}
                            <div className="text-center mb-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        borderRadius: "18px",
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                    }}
                                >
                                    <span style={{ fontSize: "2rem" }}>✏️</span>
                                </div>
                                <h2 className="fw-bold mb-1" style={{ color: "#1a1a2e" }}>Edit Student</h2>
                                <p className="text-muted mb-0">Update student information</p>
                            </div>

                            {/* FORM */}
                            <form onSubmit={submitUpdate}>

                                {/* FULL NAME */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold" style={{ color: "#2c3e50" }}>
                                        <i className="bi bi-person me-2" style={{ color: "#667eea" }}></i>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={form.fullName}
                                        onChange={(e) => updateField("fullName", e.target.value)}
                                        required
                                        style={{
                                            border: "2px solid #e9ecef",
                                            borderRadius: "12px",
                                            padding: "0.75rem 1rem"
                                        }}
                                    />
                                </div>

                                {/* EMAIL */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold" style={{ color: "#2c3e50" }}>
                                        <i className="bi bi-envelope me-2" style={{ color: "#667eea" }}></i>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        value={form.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        required
                                        style={{
                                            border: "2px solid #e9ecef",
                                            borderRadius: "12px",
                                            padding: "0.75rem 1rem"
                                        }}
                                    />
                                </div>

                                {/* GSM */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold" style={{ color: "#2c3e50" }}>
                                        <i className="bi bi-phone me-2" style={{ color: "#667eea" }}></i>
                                        GSM Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={form.gsmNumber}
                                        onChange={(e) => updateField("gsmNumber", e.target.value)}
                                        required
                                        style={{
                                            border: "2px solid #e9ecef",
                                            borderRadius: "12px",
                                            padding: "0.75rem 1rem"
                                        }}
                                    />
                                </div>

                                {/* STUDENT NUMBER */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold" style={{ color: "#2c3e50" }}>
                                        <i className="bi bi-hash me-2" style={{ color: "#667eea" }}></i>
                                        Student Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={form.number}
                                        onChange={(e) => updateField("number", e.target.value)}
                                        required
                                        style={{
                                            border: "2px solid #e9ecef",
                                            borderRadius: "12px",
                                            padding: "0.75rem 1rem"
                                        }}
                                    />
                                </div>

                                {/* BUTTONS */}
                                <div className="d-flex gap-3">
                                    <button
                                        className="btn flex-grow-1 py-3"
                                        type="submit"
                                        style={{
                                            borderRadius: "12px",
                                            fontWeight: 600,
                                            fontSize: "1.05rem",
                                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                            color: "white",
                                            border: "none"
                                        }}
                                    >
                                        <i className="bi bi-check-lg me-2"></i> Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-light py-3 px-4"
                                        onClick={() => navigate("/students")}
                                        style={{ borderRadius: "12px", fontWeight: 600 }}
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
