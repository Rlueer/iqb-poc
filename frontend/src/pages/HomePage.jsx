
// ========================================
// src/pages/HomePage.jsx
// ========================================
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="container">
                <div className="text-center text-white mb-5">
                    <h1 className="display-4 fw-bold mb-3">Student Management System</h1>
                    <p className="lead">Manage students, courses, and exam results efficiently</p>
                </div>

                <div className="row g-4 justify-content-center">
                    <div className="col-md-5">
                        <Link to="/students" className="text-decoration-none">
                            <div className="card border-0 shadow-lg h-100" style={{ transition: 'transform 0.2s' }}
                                 onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                 onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div className="card-body text-center p-5">
                                    <div className="mb-4" style={{ fontSize: '4rem' }}>📘</div>
                                    <h3 className="fw-bold mb-3" style={{ color: '#1a1a2e' }}>Manage Students</h3>
                                    <p className="text-muted">Add, edit, and view student information</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-5">
                        <Link to="/courses" className="text-decoration-none">
                            <div className="card border-0 shadow-lg h-100" style={{ transition: 'transform 0.2s' }}
                                 onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                 onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div className="card-body text-center p-5">
                                    <div className="mb-4" style={{ fontSize: '4rem' }}>📚</div>
                                    <h3 className="fw-bold mb-3" style={{ color: '#1a1a2e' }}>Manage Courses</h3>
                                    <p className="text-muted">Create and organize course catalog</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}