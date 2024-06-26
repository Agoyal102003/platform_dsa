import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginSuccess, logout } from './redux/authSlice';
import Dashboard from './Modules/Dashboard';
import Form from './components/Form';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from "./Modules/ProfileManagement";
import Leaderboard from "./Modules/Leaderboard";
import ProblemSolving from './Modules/ProblemSolving';
import AddProblem from './components/AddProblem';
import Community from './Modules/Community';
import Problems from './Modules/Problems';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import EditProfile from './components/EditProfile';
import DataStructuresViewAll from './components/DSviewall';
import AlgorithmsViewAll from './components/Algorithmviewall';
import DataStructureDetail from './components/DataStructureDetail';
import AlgorithmDetail from './components/AlgorithmDetail';
import Read from './Modules/Read';
import PathFindingVisualizer from './Modules/PathFindingVisualizer';
import SortingVisualizer from './Modules/SortingVisualizer';
import Learn from './Modules/Learn';

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // If token exists, attempt to verify it with the backend
            axios.post('/api/users/verifyToken', { token })
                .then(res => {
                    dispatch(loginSuccess(res.data.user));
                })
                .catch(err => {
                    console.error('Error verifying token:', err);
                    dispatch(logout()); // Logout user if token is invalid
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch]);

    if (loading) {
        // Render loading indicator or spinner until authentication status is determined
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />

                {/* Public Routes */}
                <Route path="/users/sign_in" element={<Form isSignInPage={true} />} />
                <Route path="/users/sign_up" element={<Form isSignInPage={false} />} />
                <Route path="/form" element={<Form />} />

                {/* Protected Routes */}
                {isAuthenticated ? (
                    <>
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                        <Route path="/problems" element={<ProtectedRoute><Problems /></ProtectedRoute>} />
                        <Route path="/problems/:id" element={<ProtectedRoute><ProblemSolving /></ProtectedRoute>} />
                        <Route path="/add-problem" element={<ProtectedRoute><AddProblem /></ProtectedRoute>} />
                        <Route path="/Community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                        <Route path="/EditProfile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                        <Route path="/DataStructures" element={<ProtectedRoute><DataStructuresViewAll /></ProtectedRoute>} />
                        <Route path="/Algorithms" element={<ProtectedRoute><AlgorithmsViewAll /></ProtectedRoute>} />
                        <Route path="/data-structure/:name" element={<ProtectedRoute><DataStructureDetail /></ProtectedRoute>} />
                        <Route path="/algorithm/:name" element={<ProtectedRoute><AlgorithmDetail /></ProtectedRoute>} />
                        <Route path="/pathfinding-visualizer" element={<ProtectedRoute><PathFindingVisualizer /></ProtectedRoute>} />
                        <Route path="/sorting-visualizer" element={<ProtectedRoute><SortingVisualizer /></ProtectedRoute>} />
                        <Route path="/Read" element={<ProtectedRoute><Read /></ProtectedRoute>} />
                        <Route path="/Learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
                    </>
                ) : (
                    <>
                        {/* Redirect unauthenticated users to sign-in page */}
                        <Route path="*" element={<Form />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
