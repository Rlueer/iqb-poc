import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get(`/courses/${id}`).then(res => setCourse(res.data)),
            api.get(`/courses/${id}/students`).then(res => setStudents(res.data))
        ]).finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="text-center text-white">
                    <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading course details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="container-fluid px-4 px-md-5">

                {/* Back Button */}
                <Link to="/courses" className="btn btn-light btn-sm mb-4 shadow-sm" style={{ borderRadius: '8px', fontWeight: 600 }}>
                    <i className="bi bi-arrow-left me-2"></i> Back to Courses
                </Link>

                {/* Course Info Card */}
                {course && (
                    <div className="card border-0 shadow-lg mb-4" style={{ borderRadius: '16px' }}>
                        <div className="card-body p-4 p-md-5">
                            <div className="d-flex align-items-center gap-4">
                                <div className="d-flex align-items-center justify-content-center"
                                     style={{
                                         width: '80px', height: '80px', borderRadius: '20px',
                                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                         fontSize: '2.5rem'
                                     }}>
                                    📚
                                </div>
                                <div>
                                    <h2 className="fw-bold mb-2" style={{ color: '#1a1a2e' }}>{course.name}</h2>
                                    <span className="badge" style={{ background: '#e0e7ff', color: '#667eea', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                        {students.length} Student{students.length !== 1 && 's'} Enrolled
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Students Card */}
                <div className="card border-0 shadow-lg" style={{ borderRadius: '16px' }}>
                    <div className="card-header bg-white border-0 p-4" style={{ borderRadius: '16px 16px 0 0' }}>
                        <h5 className="fw-bold mb-0" style={{ color: '#1a1a2e' }}>
                            <span className="me-2">👥</span> Students Taking This Course
                        </h5>
                    </div>
                    <div className="card-body p-4 pt-0">
                        {students.length === 0 ? (
                            <div className="text-center py-5">
                                <div style={{ fontSize: '4rem' }}>📭</div>
                                <h5 className="text-muted mt-3">No students yet</h5>
                                <p className="text-muted">No students have taken this course yet.</p>
                            </div>
                        ) : (
                            <div className="list-group list-group-flush">
                                {students.map(s => (
                                    <div key={s.studentId} className="list-group-item px-0 py-4 border-0 border-bottom">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="d-flex align-items-center justify-content-center"
                                                     style={{
                                                         width: '50px', height: '50px', borderRadius: '14px',
                                                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                         color: 'white', fontWeight: 'bold', fontSize: '1.1rem'
                                                     }}>
                                                    {s.fullName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <Link to={`/students/${s.studentId}`} className="text-decoration-none fw-semibold"
                                                          style={{ color: '#1a1a2e', fontSize: '1.05rem' }}>
                                                        {s.fullName}
                                                    </Link>
                                                    <div className="d-flex align-items-center gap-2 mt-1">
                                                        <span className="badge" style={{ background: '#f8f9fa', color: '#64748b', fontWeight: 500 }}>
                                                            {s.examCount} Exam{s.examCount !== 1 && 's'}
                                                        </span>
                                                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                                                            Scores: {s.examScores.join(", ")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <div className="badge shadow-sm" style={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    fontSize: '0.95rem',
                                                    padding: '0.6rem 1rem',
                                                    borderRadius: '10px'
                                                }}>
                                                    Avg: {s.averageScore.toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {students.length > 0 && (
                        <div className="card-footer bg-white border-0 py-3 px-4" style={{ borderRadius: '0 0 16px 16px' }}>
                            <p className="mb-0 text-muted">
                                <i className="bi bi-info-circle me-2"></i>
                                Total of <strong>{students.length}</strong> student{students.length !== 1 && 's'} enrolled in this course
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}