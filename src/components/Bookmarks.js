import React from 'react';
import { Link } from 'react-router-dom';

const Bookmarks = ({ bookmarks, onRemoveBookmark }) => {
  return (
    <div className="bookmarks-container">
      {bookmarks.length === 0 ? (
        <p className="empty-text">No bookmarks yet.</p>
      ) : (
        bookmarks.map(job => (
          <div className="bookmark-card" key={job.id}>
            <h2>{job.title}</h2>
              <p>Location: {job.primary_details?.Place || 'N/A'}</p>
              <p>Salary: {job.primary_details?.Salary || 'N/A'}</p>
              <p>Phone: {job.whatsapp_no || 'N/A'}</p>
            <button className="remove-bookmark-btn" onClick={() => onRemoveBookmark(job)}>Remove Bookmark</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmarks;
