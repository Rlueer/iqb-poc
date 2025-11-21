// src/pages/CourseEdit.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function CourseEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/courses/${id}`)
            .then(res => {
                setName(res.data.name);
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
            await api.put(`/courses/${id}`, { name });
            alert("Course updated successfully!");
            navigate("/courses");
        } catch (err) {
            console.error(err);
            alert("Error updating course.");
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        {/* Back Button */}
                        <Link
                            to="/courses"
                            className="d-inline-flex align-items-center text-decoration-none text-primary mb-4 fw-medium"
                            style={{ fontSize: '0.95rem' }}
                        >
                            <svg
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="me-2"
                                viewBox="0 0 16 16"
                            >
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                            Back to Courses
                        </Link>

                        {/* Card */}
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4 p-md-5">
                                {/* Header */}
                                <div className="mb-4">
                                    <h2 className="fw-bold mb-2" style={{ color: '#1a1a2e' }}>
                                        Edit Course
                                    </h2>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
                                        Update course information
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={submitUpdate}>
                                    <div className="mb-4">
                                        <label
                                            className="form-label fw-semibold mb-2"
                                            style={{ color: '#2c3e50', fontSize: '0.9rem' }}
                                        >
                                            Course Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter course name"
                                            required
                                            style={{
                                                border: '2px solid #e9ecef',
                                                borderRadius: '8px',
                                                padding: '0.75rem 1rem',
                                                fontSize: '1rem',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#0d6efd'}
                                            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="d-flex gap-3">
                                        <button
                                            className="btn btn-primary flex-grow-1"
                                            type="submit"
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                borderRadius: '8px',
                                                fontWeight: '500',
                                                fontSize: '0.95rem',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                            }}
                                            onMouseOver={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                fill="currentColor"
                                                className="me-2 mb-1"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                            </svg>
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate("/courses")}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                borderRadius: '8px',
                                                fontWeight: '500',
                                                fontSize: '0.95rem',
                                                border: '2px solid #e9ecef',
                                                color: '#6c757d'
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div
                            className="alert alert-light border-0 mt-4"
                            style={{
                                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                borderRadius: '8px'
                            }}
                        >
                            <div className="d-flex align-items-start">
                                <svg
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="me-3 mt-1"
                                    viewBox="0 0 16 16"
                                    style={{ color: '#667eea' }}
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                                <small style={{ color: '#5a6c7d', lineHeight: '1.6' }}>
                                    Changes will be reflected immediately after saving. Make sure the course name is unique and descriptive.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}