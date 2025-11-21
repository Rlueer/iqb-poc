import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function StudentCreate() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [gsmNumber, setGsmNumber] = useState("");
    const [number, setNumber] = useState("");
    const navigate = useNavigate();

    const submitStudent = async (e) => {
        e.preventDefault();
        try {
            await api.post("/students", {
                fullName,
                email,
                gsmNumber,
                number,
            });
            alert("Student created!");
            navigate("/students");
        } catch (err) {
            console.error(err);
            alert("Error creating student.");
        }
    };

    return (
        <div
            className="min-vh-100 py-5 d-flex justify-content-center align-items-start"
            style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
        >
            <div className="container-fluid px-4 px-md-5">
                {/* CARD WRAPPER */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}
                >
                    {/* BACK BUTTON */}
                    <Link
                        to="/students"
                        className="btn btn-light btn-sm mb-4 shadow-sm"
                        style={{ borderRadius: "8px", fontWeight: 600 }}
                    >
                        <i className="bi bi-arrow-left me-2"></i> Back to Students
                    </Link>

                    {/* CARD */}
                    <div
                        className="card border-0 shadow-lg"
                        style={{ borderRadius: "20px" }}
                    >
                        <div className="card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        borderRadius: "18px",
                                        background:
                                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    }}
                                >
                                    <span style={{ fontSize: "2rem" }}>🎓</span>
                                </div>
                                <h2 className="fw-bold mb-1" style={{ color: "#1a1a2e" }}>
                                    Add New Student
                                </h2>
                                <p className="text-muted mb-0">Create a new student profile</p>
                            </div>

                            {/* FORM */}
                            <form onSubmit={submitStudent}>
                                <div className="mb-4">
                                    <label
                                        className="form-label fw-semibold"
                                        style={{ color: "#090000" }}
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="e.g. Emre Yavuz"
                                        required
                                        style={{
                                            border: "2px solid #e9ecef",
                                            borderRadius: "12px",
                                            padding: "0.75rem 1rem",
                                        }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="form-label fw-semibold"
                                        style={{ color: "#2c3e50" }}
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="emre@example.com"
                                        required
                                        style={{
                                            border: "2px solid #e9ecef",
                                            borderRadius: "12px",
                                            padding: "0.75rem 1rem",
                                        }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="form-label fw-semibold"
                                        style={{ color: "#2c3e50" }}
                                    >
                                        GSM Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={gsmNumber}
                                        onChange={(e) => setGsmNumber(e.target.value)}
                                        placeholder="5551112233"
                                        required
                                        style={{
                                            border: "2px solid #e9ecef",
                                            borderRadius: "12px",
                                            padding: "0.75rem 1rem",
                                        }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="form-label fw-semibold"
                                        style={{ color: "#2c3e50" }}
                                    >
                                        Student Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                        placeholder="1001"
                                        required
                                        style={{
                                            border: "2px solid #e9ecef",
                                            borderRadius: "12px",
                                            padding: "0.75rem 1rem",
                                        }}
                                    />
                                </div>

                                <button
                                    className="btn w-100 py-3"
                                    type="submit"
                                    style={{
                                        borderRadius: "12px",
                                        fontWeight: 600,
                                        fontSize: "1.05rem",
                                        border: "none",
                                        background:
                                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "white",
                                    }}
                                >
                                    <i className="bi bi-plus-lg me-2"></i> Add Student
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* END CARD */}
                </div>
            </div>
        </div>
    );
}
