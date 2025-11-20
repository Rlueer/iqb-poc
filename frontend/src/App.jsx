import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from "./pages/StudenList.jsx";
import StudentDetail from "./pages/StudentDetail.jsx";
import StudentCreate from "./pages/StudenCreate.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/students" element={<StudentList />} />
                <Route path="/students/:id" element={<StudentDetail />} />
                <Route path="/students/new" element={<StudentCreate />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
