import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CourseEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");

    useEffect(() => {
        api.get(`/courses/${id}`)
            .then(res => setName(res.data.name))
            .catch(err => console.error(err));
    }, [id]);

    const submitUpdate = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/courses/${id}`, { name });
            alert("Course updated!");
            navigate("/courses");
        } catch (err) {
            console.error(err);
            alert("Error updating course.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Course</h2>

            <form onSubmit={submitUpdate} className="mt-3">
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
                    Save Changes
                </button>
            </form>
        </div>
    );
}
