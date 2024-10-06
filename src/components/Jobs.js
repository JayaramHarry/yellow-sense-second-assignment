
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

const Jobs = ({ onBookmark, bookmarks = [], searchQuery }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current job index
  const [notification, setNotification] = useState(''); // State for notification message

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://testapi.getlokalapp.com/common/jobs');
        const jobData = response.data.results;

        setJobs(prevJobs => {
          const uniqueJobs = new Map();
          [...prevJobs, ...jobData].forEach(job => {
            uniqueJobs.set(job.id, job);
          });
          return Array.from(uniqueJobs.values());
        });

        setLoading(false);
        if (jobData.length < 10) setHasMore(false);
      } catch (error) {
        setError('Failed to fetch jobs.');
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchJobs();
    }
  }, [page, hasMore]);

  useEffect(() => {
    const results = jobs.filter(job =>
      (job.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(results);
  }, [searchQuery, jobs]);

  const loadMore = () => {
    if (hasMore) setPage(prevPage => prevPage + 1);
  };

  const isBookmarked = jobId => bookmarks.some(bookmark => bookmark.id === jobId);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const currentJob = filteredJobs[currentIndex];

      if (isBookmarked(currentJob.id)) {
        const confirmRemove = window.confirm('Are you sure you want to remove the bookmarked job?');
        if (confirmRemove) {
          // If confirmed, remove the job from bookmarks
          onBookmark(currentJob); // Assuming onBookmark toggles bookmark status
          setFilteredJobs(prevJobs => prevJobs.filter((_, index) => index !== currentIndex));
          setNotification('Job removed from bookmarks!'); // Set notification message
          setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
        }
      } else {
        // If not bookmarked, just remove it
        setFilteredJobs(prevJobs => prevJobs.filter((_, index) => index !== currentIndex));
        setNotification('Job card removed!'); // Set notification message
        setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
      }

      // Adjust currentIndex if needed
      if (currentIndex > 0) {
        setCurrentIndex(prevIndex => prevIndex - 1);
      } else {
        setCurrentIndex(0);
      }
    },
    onSwipedRight: () => {
      const currentJob = filteredJobs[currentIndex];
      if (isBookmarked(currentJob.id)) {
        // If already bookmarked, unbookmark it
        onBookmark(currentJob);
        setNotification('Removed from bookmarks!'); // Set notification message
      } else {
        // Bookmark the currently displayed job
        onBookmark(currentJob);
        setNotification('Saved successfully!'); // Set notification message
      }
      setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  const handleJobCardClick = (index) => {
    setCurrentIndex(index); // Set clicked job as current job
  };

  return (
    <div className="jobs-container">
      {error && <p className="error-text">{error}</p>}
      {filteredJobs.length === 0 && !loading && <p className="empty-text">No jobs available.</p>}
      <div className="job-display" {...swipeHandlers}>        
          {filteredJobs.length > 0 && (
            <div className="job-card collapsed" key={filteredJobs[currentIndex].id}>
              <h2>{filteredJobs[currentIndex].title}</h2>
              <div className="job-details">
                <p className="job-place">Location: {filteredJobs[currentIndex].primary_details?.Place || 'N/A'}</p>
                <p className="job-salary">Salary: {filteredJobs[currentIndex].primary_details?.Salary || 'N/A'}</p>
                <p className="job-phone">Phone: {filteredJobs[currentIndex].whatsapp_no || 'N/A'}</p>
              </div>
              <button
                className={`bookmark-btn ${isBookmarked(filteredJobs[currentIndex].id) ? 'bookmarked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering job card click
                  onBookmark(filteredJobs[currentIndex]);
                  setNotification(isBookmarked(filteredJobs[currentIndex].id) ? 'Removed from bookmarks!' : 'Saved successfully!'); // Set notification message
                  setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
                }}
              >
                 
                {isBookmarked(filteredJobs[currentIndex].id) ? 'Bookmarked' : 'Bookmark'}
              </button>
              <Link to={`/jobs/${filteredJobs.id}`} className="view-details-btn">View Details</Link>
            </div>
          )}
      </div>
      <div className="job-cards-container">
        {filteredJobs.length > 0 && filteredJobs.map((job, index) => (
          index !== currentIndex && (
            <div 
              className="job-card collapsed" 
              key={job.id} 
              onClick={() => handleJobCardClick(index)} // Set clicked job as current
            >
              <h2>{job.title}</h2>
              <div className="job-details">
                <p className="job-place">Location: {job.primary_details?.Place || 'N/A'}</p>
                <p className="job-salary">Salary: {job.primary_details?.Salary || 'N/A'}</p>
                <p className="job-phone">Phone: {job.whatsapp_no || 'N/A'}</p>
              </div>
              <button
                className={`bookmark-btn ${isBookmarked(job.id) ? 'bookmarked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering job card click
                  onBookmark(job);
                  setNotification(isBookmarked(job.id) ? 'Removed from bookmarks!' : 'Saved successfully!'); // Set notification message
                  setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
                }}
              >
                {isBookmarked(job.id) ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>
          )
        ))}

      </div>
      {loading && <p className="loading-text">Loading...</p>}
      {!loading && hasMore && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
      {!hasMore && <p className="end-message">End of results</p>}

      {/* Notification Tooltip */}
      {notification && (
        <div className="notification-tooltip">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Jobs;








