// import React, { useState } from 'react';

// const Bookmarks = ({ bookmarks, onRemoveBookmark }) => {
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Filter bookmarks based on the search query
//   const filteredBookmarks = bookmarks.filter(job =>
//     (job.title || '').toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="bookmarks-container">
//       {filteredBookmarks.length === 0 ? (
//         <p className="empty-text">No jobs bookmarked yet.</p>
//       ) : (
//         filteredBookmarks.map(job => (
//           <div className="bookmark-card" key={job.id}>
//             <h2>{job.title}</h2>
//             <p>Location: {job.primary_details?.Place || 'N/A'}</p>
//             <p>Salary: {job.primary_details?.Salary || 'N/A'}</p>
//             <p>Phone: {job.whatsapp_no || 'N/A'}</p>
//             <button className="remove-bookmark-btn" onClick={() => onRemoveBookmark(job.id)}>
//               Remove Bookmark
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Bookmarks;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Bookmarks = ({ bookmarks, onRemoveBookmark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter bookmarks based on the search query
  const filteredBookmarks = bookmarks.filter(job =>
    (job.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bookmarks-container">
      {filteredBookmarks.length === 0 ? (
        <p className="empty-text">No jobs bookmarked yet.</p>
      ) : (
        filteredBookmarks.map(job => (
          <div className="bookmark-card" key={job.id}>
            <Link to={`/jobs/${job.id}`} className="bookmark-link">
              <h2>{job.title}</h2>
              <p>Location: {job.primary_details?.Place || 'N/A'}</p>
              <p>Salary: {job.primary_details?.Salary || 'N/A'}</p>
              <p>Phone: {job.whatsapp_no || 'N/A'}</p>
            </Link>
            <button className="remove-bookmark-btn" onClick={() => onRemoveBookmark(job.id)}>
              Remove Bookmark
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmarks;
