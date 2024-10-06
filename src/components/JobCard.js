import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onBookmark, isBookmarked, onSwipe }) => {
  // Swipeable config
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => onSwipe(job, 'right'),
    onSwipedLeft: () => onSwipe(job, 'left'),
  });

  return (
    <div className="job-card" key={job.id} {...swipeHandlers}>
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
  );
};

export default JobCard;
