import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import SearchTrain from './components/SerachTrain';
import BaseLayout from './components/BaseLayout';
import BookTicket from './components/BookTicket';
import AddFunds from './components/AddFunds';
import CheckBalance from './components/CheckBalance';
import ProtectedRoute from './components/ProtectedRoute';
import DisplayTicket from './components/DisplayTicket';


function App() {
  return (
    <Router>
      <BaseLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/search/train" element={<SearchTrain />} />
            <Route path="/book/ticket" element={<BookTicket />} />
            <Route path="/add/funds" element={<AddFunds />} />
            <Route path="/check/balance" element={<CheckBalance />} />
            <Route path="/display/ticket" element={<DisplayTicket />} />
          </Route>
        </Routes>
      </BaseLayout>
    </Router>
  );
}

export default App;
