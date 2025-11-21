import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CourseCreate() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const submitCourse = async (e) => {
        e.preventDefault();
        try {
            await api.post("/courses", { name });
            alert("Course created!");
            navigate("/courses");
        } catch (err) {
            console.error(err);
            alert("Error creating course.");
        }
    };

    return (
        <div className="min-vh-100 py-5 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="container-fluid px-4 px-md-5">
                <div className="row justify-content-center">
                    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>

                        <Link to="/courses" className="btn btn-light btn-sm mb-4 shadow-sm" style={{ borderRadius: '8px', fontWeight: 600 }}>
                            <i className="bi bi-arrow-left me-2"></i> Back to Courses
                        </Link>

                        <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                            <div className="card-body p-4 p-md-5">

                                <div className="text-center mb-4">
                                    <div className="d-inline-flex align-items-center justify-content-center mb-3"
                                         style={{ width: '70px', height: '70px', borderRadius: '18px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                        <span style={{ fontSize: '2rem' }}>📚</span>
                                    </div>
                                    <h2 className="fw-bold mb-1" style={{ color: '#1a1a2e' }}>Add New Course</h2>
                                    <p className="text-muted mb-0">Create a new course in the system</p>
                                </div>

                                <form onSubmit={submitCourse}>
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold" style={{ color: '#2c3e50' }}>
                                            <i className="bi bi-book me-2" style={{ color: '#667eea' }}></i>Course Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Mathematics 101"
                                            required
                                            style={{ border: '2px solid #e9ecef', borderRadius: '12px', padding: '0.75rem 1rem' }}
                                        />
                                    </div>

                                    <button className="btn w-100 py-3" type="submit"
                                            style={{ borderRadius: '12px', fontWeight: 600, fontSize: '1.05rem', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                                        <i className="bi bi-plus-lg me-2"></i> Add Course
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}