// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Jobs = ({ onBookmark, bookmarks = [] }) => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredJobs, setFilteredJobs] = useState([]);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get(
//           `https://testapi.getlokalapp.com/common/jobs`
//         );
//         const jobData = response.data.results;

//         setJobs(prevJobs => {
//           const uniqueJobs = new Map();
//           [...prevJobs, ...jobData].forEach(job => {
//             uniqueJobs.set(job.id, job);
//           });
//           return Array.from(uniqueJobs.values());
//         });

//         setLoading(false);
//         if (jobData.length < 10) setHasMore(false);
//       } catch (error) {
//         setError('Failed to fetch jobs.');
//         setLoading(false);
//       }
//     };

//     if (hasMore) {
//       fetchJobs();
//     }
//   }, [page, hasMore]);

//   useEffect(() => {
//     const results = jobs.filter(job =>
//       (job.title || '').toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredJobs(results);
//   }, [searchQuery, jobs]);

//   const loadMore = () => {
//     if (hasMore) setPage(prevPage => prevPage + 1);
//   };

//   const isBookmarked = jobId => bookmarks.some(bookmark => bookmark.id === jobId);

//   return (
//     <>
//       <nav className="top-nav">
//         <span className='nav-heding'>YellowSense</span>
//         <input
//           type="text"
//           placeholder="Search jobs..."
//           value={searchQuery}
//           onChange={e => setSearchQuery(e.target.value)}
//           className="search-bar"
//         />
//       </nav>
//       <div className="jobs-container">
//         {error && <p className="error-text">{error}</p>}
//         {filteredJobs.length === 0 && !loading && <p className="empty-text">No jobs available.</p>}
//         {filteredJobs.map(job => (
//           <div className="job-card" key={job.id}>
//             <h2>{job.title}</h2>
//             <div className="job-details">
//               <p className="job-place">Location: {job.primary_details?.Place || 'N/A'}</p>
//               <p className="job-salary">Salary: {job.primary_details?.Salary || 'N/A'}</p>
//               <p className="job-phone">Phone: {job.whatsapp_no || 'N/A'}</p>
//             </div>
//             <button
//               className={`bookmark-btn ${isBookmarked(job.id) ? 'bookmarked' : ''}`}
//               onClick={() => onBookmark(job)}
//             >
//               {isBookmarked(job.id) ? 'Bookmarked' : 'Bookmark'}
//             </button>
//             <Link to={`/jobs/${job.id}`} className="view-details-btn">View Details</Link>
//           </div>
//         ))}
//         {loading && <p className="loading-text">Loading...</p>}
//         {!loading && hasMore && (
//           <button className="load-more-btn" onClick={loadMore}>
//             Load More
//           </button>
//         )}
//         {!hasMore && <p className="end-message">End of results</p>}
//       </div>
//     </>
//   );
// };

// export default Jobs;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Jobs = ({ onBookmark, bookmarks = [], searchQuery }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);

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

  return (
    <div className="jobs-container">
      {error && <p className="error-text">{error}</p>}
      {filteredJobs.length === 0 && !loading && <p className="empty-text">No jobs available.</p>}
      {filteredJobs.map(job => (
        <div className="job-card" key={job.id}>
          <h2>{job.title}</h2>
          <div className="job-details">
            <p className="job-place">Location: {job.primary_details?.Place || 'N/A'}</p>
            <p className="job-salary">Salary: {job.primary_details?.Salary || 'N/A'}</p>
            <p className="job-phone">Phone: {job.whatsapp_no || 'N/A'}</p>
          </div>
          <button
            className={`bookmark-btn ${isBookmarked(job.id) ? 'bookmarked' : ''}`}
            onClick={() => onBookmark(job)}
          >
            {isBookmarked(job.id) ? 'Bookmarked' : 'Bookmark'}
          </button>
          <Link to={`/jobs/${job.id}`} className="view-details-btn">View Details</Link>
        </div>
      ))}
      {loading && <p className="loading-text">Loading...</p>}
      {!loading && hasMore && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
      {!hasMore && <p className="end-message">End of results</p>}
    </div>
  );
};

export default Jobs;
