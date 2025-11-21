import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const loadStudents = async () => {
        try {
            const res = await api.get("/students");
            setStudents(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const searchStudents = async () => {
        if (query.trim() === "") {
            loadStudents();
            return;
        }
        try {
            setLoading(true);
            const res = await api.get(`/students/search?q=${query}`);
            setStudents(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
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
                            📘 Student List
                        </h1>
                        <p className="mb-0 opacity-75">Manage and view all students</p>
                    </div>
                    <Link to="/students/new" className="btn btn-light shadow px-4 py-2" style={{ borderRadius: '12px', fontWeight: 600 }}>
                        <i className="bi bi-plus-lg me-2"></i> Add New Student
                    </Link>
                </div>

                {/* Search Card */}
                <div className="card border-0 shadow-lg mb-4" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                        <div className="input-group input-group-lg">
                            <span className="input-group-text bg-white border-0" style={{ borderRadius: '12px 0 0 12px' }}>
                                <i className="bi bi-search text-muted"></i>
                            </span>
                            <input
                                className="form-control border-0 shadow-none"
                                placeholder="Search by name, email, GSM, or student number..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && searchStudents()}
                                style={{ fontSize: '1rem' }}
                            />
                            <button
                                className="btn px-4"
                                onClick={searchStudents}
                                style={{ borderRadius: '0 12px 12px 0', fontWeight: 600, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}
                                disabled={loading}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Card */}
                <div className="card border-0 shadow-lg" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" style={{ color: '#667eea' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading students...</p>
                            </div>
                        ) : students.length === 0 ? (
                            <div className="text-center py-5">
                                <div style={{ fontSize: '4rem' }}>📭</div>
                                <h5 className="text-muted mt-3">No students found</h5>
                                <p className="text-muted">Try adjusting your search or add a new student</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                    <tr>
                                        <th className="text-black border-0" style={{ padding: '1.2rem 1.5rem' }}>#</th>
                                        <th className="text-black border-0" style={{ padding: '1.2rem 1.5rem' }}>Full Name</th>
                                        <th className="text-black border-0" style={{ padding: '1.2rem 1.5rem' }}>Email</th>
                                        <th className="text-black border-0" style={{ padding: '1.2rem 1.5rem' }}>GSM</th>
                                        <th className="text-black border-0" style={{ padding: '1.2rem 1.5rem' }}>Student No</th>
                                        <th className="text-black border-0 text-end" style={{ padding: '1.2rem 1.5rem', minWidth: '280px' }}>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {students.map((s, index) => (
                                        <tr key={s.id} style={{ transition: 'background-color 0.2s' }}>
                                            <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>{index + 1}</td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <span className="fw-semibold" style={{ color: '#1a1a2e' }}>{s.fullName}</span>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>{s.email}</td>
                                            <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>{s.gsmNumber}</td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                    <span className="badge" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}>
                                                        {s.number}
                                                    </span>
                                            </td>
                                            <td className="text-end" style={{ padding: '1rem 1.5rem' }}>
                                                <Link to={`/students/${s.id}`} className="btn btn-sm me-2" style={{ background: '#e0e7ff', color: '#667eea', fontWeight: 600, borderRadius: '8px' }}>
                                                    <i className="bi bi-eye me-1"></i> Details
                                                </Link>
                                                <Link to={`/students/${s.id}/edit`} className="btn btn-sm me-2" style={{ background: '#fef3c7', color: '#d97706', fontWeight: 600, borderRadius: '8px' }}>
                                                    <i className="bi bi-pencil me-1"></i> Edit
                                                </Link>
                                                <button onClick={() => deleteStudent(s.id)} className="btn btn-sm" style={{ background: '#fee2e2', color: '#dc2626', fontWeight: 600, borderRadius: '8px' }}>
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
                    {!loading && students.length > 0 && (
                        <div className="card-footer bg-white border-0 py-3 px-4" style={{ borderRadius: '0 0 16px 16px' }}>
                            <p className="mb-0 text-muted">
                                <i className="bi bi-info-circle me-2"></i>
                                Showing <strong>{students.length}</strong> student{students.length !== 1 && 's'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}