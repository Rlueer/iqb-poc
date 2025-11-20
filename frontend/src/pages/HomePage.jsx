import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="container mt-4">
            <h1>Dashboard</h1>

            <div className="row mt-4">

                {/* Students box */}
                <div className="col-md-6">
                    <Link
                        to="/students"
                        className="btn btn-outline-primary w-100 p-4"
                        style={{ fontSize: "20px" }}
                    >
                        📘 Manage Students
                    </Link>
                </div>

                {/* Courses box */}
                <div className="col-md-6">
                    <Link
                        to="/courses"
                        className="btn btn-outline-success w-100 p-4"
                        style={{ fontSize: "20px" }}
                    >
                        📚 Manage Courses
                    </Link>
                </div>

            </div>
        </div>
    );
}
