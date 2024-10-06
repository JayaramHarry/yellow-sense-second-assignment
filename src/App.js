import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';
import JobDetails from './components/JobDetails';
import './App.css';

const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [dismissedJobs, setDismissedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load bookmarks and dismissed jobs from local storage on component mount
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const storedDismissedJobs = JSON.parse(localStorage.getItem('dismissedJobs')) || [];
    setBookmarks(storedBookmarks);
    setDismissedJobs(storedDismissedJobs);
  }, []);

  // Save bookmarks and dismissed jobs to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('dismissedJobs', JSON.stringify(dismissedJobs));
  }, [bookmarks, dismissedJobs]);

  const handleBookmark = job => {
    setBookmarks(prevBookmarks => {
      const isAlreadyBookmarked = prevBookmarks.some(bm => bm.id === job.id);
      if (isAlreadyBookmarked) {
        return prevBookmarks.filter(bm => bm.id !== job.id);
      } else {
        return [...prevBookmarks, job];
      }
    });
  };

  const handleDismiss = jobId => {
    setDismissedJobs(prevDismissed => [...prevDismissed, jobId]);
  };

  return (
    <Router>
      <div className="App">
        {/* Top Navigation */}
        <nav className="top-nav">
          <span className="nav-heading">YellowSense</span>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </nav>

        <Routes>
          <Route
            path="/bookmarks"
            element={<Bookmarks bookmarks={bookmarks} onRemoveBookmark={handleBookmark} />}
          />
          <Route
            path="/"
            element={<Jobs 
              onBookmark={handleBookmark} 
              onDismiss={handleDismiss} 
              bookmarks={bookmarks} 
              dismissedJobs={dismissedJobs}
              searchQuery={searchQuery} 
            />}
          />
          <Route
            path="/jobs/:id"
            element={<JobDetails />}
          />
        </Routes>

        {/* Bottom Navigation */}
        <nav className="navbar">
          <Link to="/">Jobs</Link>
          <Link to="/bookmarks">Bookmarks</Link>
        </nav>
      </div>
    </Router>
  );
};

export default App;
