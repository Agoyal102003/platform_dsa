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
import ExploreCommunity from './components/ExploreCommunity';
import TutorialList from './components/TutorialList';
import TutorialDetail from './components/TutorialDetail';
import ProblemsList from './components/ProblemsList';
import ProblemDetail from './components/ProblemDetail';
import AddProblem from './components/AddProblem';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
                        <Route path="/explore-communities" element={<ProtectedRoute><ExploreCommunity /></ProtectedRoute>} />
                        <Route path="/tutorials" element={<ProtectedRoute><TutorialList /></ProtectedRoute>} />
                        <Route path="/tutorial/:id" element={<ProtectedRoute><TutorialDetail /></ProtectedRoute>} />
                        <Route path="/problems" element={<ProtectedRoute><ProblemsList /></ProtectedRoute>} />
                        <Route path="/problems/:id" element={<ProtectedRoute><ProblemDetail /></ProtectedRoute>} />
                        <Route path="/add-problem" element={<ProtectedRoute><AddProblem /></ProtectedRoute>} />
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
