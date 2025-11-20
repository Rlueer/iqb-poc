import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from "./pages/StudentList.jsx";
import StudentDetail from "./pages/StudentDetail.jsx";
import StudentCreate from "./pages/StudentCreate.jsx";
import ExamCreate from "./pages/ExamCreate.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/students" element={<StudentList />} />
                <Route path="/students/:id" element={<StudentDetail />} />
                <Route path="/students/new" element={<StudentCreate />} />
                <Route path="/students/:id/add-exam" element={<ExamCreate />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
