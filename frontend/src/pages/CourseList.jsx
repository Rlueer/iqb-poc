import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCourses = async () => {
        try {
            const res = await api.get("/courses");
            setCourses(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const deleteCourse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await api.delete(`/courses/${id}`);
            loadCourses();
        } catch (err) {
            console.error(err);
            alert("Error deleting course.");
        }
    };

    return (
        <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="container-fluid px-4 px-md-5">

                {/* Back Button */}
                <Link to="/" className="btn btn-light btn-sm mb-4 shadow-sm" style={{ borderRadius: '8px', fontWeight: 600 }}>
                    <i className="bi bi-arrow-left me-2"></i> Back to Home
                </Link>

                {/* Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                    <div className="text-white">
                        <h1 className="fw-bold mb-1" style={{ fontSize: '2.5rem' }}>
                            📚 Course Catalog
                        </h1>
                        <p className="mb-0 opacity-75">Manage and organize all courses</p>
                    </div>
                    <Link to="/courses/new" className="btn btn-light shadow px-4 py-2" style={{ borderRadius: '12px', fontWeight: 600 }}>
                        <i className="bi bi-plus-lg me-2"></i> Add New Course
                    </Link>
                </div>

                {/* Table Card */}
                <div className="card border-0 shadow-lg" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" style={{ color: '#667eea' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading courses...</p>
                            </div>
                        ) : courses.length === 0 ? (
                            <div className="text-center py-5">
                                <div style={{ fontSize: '4rem' }}>📭</div>
                                <h5 className="text-muted mt-3">No courses available</h5>
                                <p className="text-muted">Start by adding a new course</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                    <tr>
                                        <th className="text-white border-0" style={{ padding: '1.2rem 1.5rem' }}>#</th>
                                        <th className="text-white border-0" style={{ padding: '1.2rem 1.5rem' }}>Course Name</th>
                                        <th className="text-white border-0 text-end" style={{ padding: '1.2rem 1.5rem', minWidth: '280px' }}>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {courses.map((c, index) => (
                                        <tr key={c.id} style={{ transition: 'background-color 0.2s' }}>
                                            <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>{index + 1}</td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <div className="d-flex align-items-center">
                                                    <div className="me-3 d-flex align-items-center justify-content-center"
                                                         style={{
                                                             width: '45px',
                                                             height: '45px',
                                                             borderRadius: '12px',
                                                             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                             color: 'white',
                                                             fontSize: '1.2rem'
                                                         }}>
                                                        📖
                                                    </div>
                                                    <span className="fw-semibold" style={{ color: '#1a1a2e', fontSize: '1.05rem' }}>{c.name}</span>
                                                </div>
                                            </td>
                                            <td className="text-end" style={{ padding: '1rem 1.5rem' }}>
                                                <Link to={`/courses/${c.id}`} className="btn btn-sm me-2" style={{ background: '#e0e7ff', color: '#667eea', fontWeight: 600, borderRadius: '8px' }}>
                                                    <i className="bi bi-eye me-1"></i> Details
                                                </Link>
                                                <Link to={`/courses/${c.id}/edit`} className="btn btn-sm me-2" style={{ background: '#fef3c7', color: '#d97706', fontWeight: 600, borderRadius: '8px' }}>
                                                    <i className="bi bi-pencil me-1"></i> Edit
                                                </Link>
                                                <button onClick={() => deleteCourse(c.id)} className="btn btn-sm" style={{ background: '#fee2e2', color: '#dc2626', fontWeight: 600, borderRadius: '8px' }}>
                                                    <i className="bi bi-trash me-1"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {!loading && courses.length > 0 && (
                        <div className="card-footer bg-white border-0 py-3 px-4" style={{ borderRadius: '0 0 16px 16px' }}>
                            <p className="mb-0 text-muted">
                                <i className="bi bi-info-circle me-2"></i>
                                Showing <strong>{courses.length}</strong> course{courses.length !== 1 && 's'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}