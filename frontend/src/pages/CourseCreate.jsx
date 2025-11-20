import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CourseCreate() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const submitCourse = async (e) => {
        e.preventDefault();

        try {
            await api.post("/courses", { name });
            alert("Course created!");
            navigate("/"); // Ana sayfaya dön
        } catch (err) {
            console.error(err);
            alert("Error creating course.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Course</h2>

            <form onSubmit={submitCourse} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Add Course
                </button>
            </form>
        </div>
    );
}
