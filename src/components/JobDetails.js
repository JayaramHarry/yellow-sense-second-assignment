// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${id}`);
//         console.log(response.data); // Log the data to inspect its structure
//         setJob(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(`Failed to fetch job details. Status: ${error.response?.status || 'Unknown'} - ${error.message}`);
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [id]);

//   if (loading) return <p className="loading-text">Loading...</p>;
//   if (error) return <p className="error-text">{error}</p>;
//   if (!job) return <p className="empty-text">Job not found.</p>;

//   // Destructure the job object
//   const {
//     company_name,
//     job_role,
//     job_location_slug,
//     amount,
//     other_details,
//     whatsapp_no,
//     contact_preference,
//     custom_link,
//     button_text,
//     creatives,
//     contentV3,
//     experience,
//     qualification
//   } = job || {};

//   // Extract content from contentV3 if available
//   const experienceValue = contentV3?.V3?.find(field => field.field_key === 'Experience')?.field_value || 'N/A';
//   const qualificationValue = contentV3?.V3?.find(field => field.field_key === 'Qualification')?.field_value || 'N/A';

//   return (
//     <div className="job-details-container">
//       <h1>{company_name || 'N/A'}</h1>
//       {creatives && creatives.length > 0 && (
//         <img src={creatives[0]?.file} alt={job_role} className="job-image" />
//       )}
//       <p><strong>Job Role:</strong> {job_role || 'N/A'}</p>
//       <p><strong>Location:</strong> {job_location_slug || 'N/A'}</p>
//       <p><strong>Salary:</strong> {amount || 'N/A'}</p>
//       <p><strong>Experience:</strong> {experienceValue || experience || 'N/A'}</p>
//       <p><strong>Qualification:</strong> {qualificationValue || qualification || 'N/A'}</p>
//       <p><strong>Description:</strong> {other_details || 'N/A'}</p>
//       <p><strong>Phone:</strong> {whatsapp_no || 'N/A'}</p>
//       {contact_preference?.whatsapp_link && (
//         <a href={contact_preference.whatsapp_link} className="contact-link">
//           Contact via WhatsApp
//         </a>
//       )}
//       {custom_link && (
//         <a href={custom_link} className="call-link">
//           {button_text || 'Call HR'}
//         </a>
//       )}
//     </div>
//   );
// };

// export default JobDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${id}`);
        const jobData = response.data.results.find(job => job.id === parseInt(id));
        setJob(jobData);
        setLoading(false);
      } catch (error) {
        setError(`Failed to fetch job details. Status: ${error.response?.status || 'Unknown'} - ${error.message}`);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!job) return <p className="empty-text">Job not found.</p>;

  // Destructure the job object
  const {
    company_name,
    job_role,
    job_location_slug,
    amount,
    other_details,
    whatsapp_no,
    contact_preference,
    custom_link,
    button_text,
    creatives,
    contentV3,
    experience,
    qualification
  } = job;

  // Extract content from contentV3 if available
  const experienceValue = contentV3?.V3?.find(field => field.field_key === 'Experience')?.field_value || 'N/A';
  const qualificationValue = contentV3?.V3?.find(field => field.field_key === 'Qualification')?.field_value || 'N/A';

  return (
    <div className="job-details-container">
      <h1>{company_name || 'N/A'}</h1>
      {creatives && creatives.length > 0 && (
        <img src={creatives[0]?.file} alt={job_role} className="job-image" />
      )}
      <p><strong>Job Role:</strong> {job_role || 'N/A'}</p>
      <p><strong>Location:</strong> {job_location_slug || 'N/A'}</p>
      <p><strong>Salary:</strong> {amount || 'N/A'}</p>
      <p><strong>Experience:</strong> {experienceValue || experience || 'N/A'}</p>
      <p><strong>Qualification:</strong> {qualificationValue || qualification || 'N/A'}</p>
      <p><strong>Description:</strong> {other_details || 'N/A'}</p>
      <p><strong>Phone:</strong> {whatsapp_no || 'N/A'}</p>
      {contact_preference?.whatsapp_link && (
        <a href={contact_preference.whatsapp_link} className="contact-link">
          Contact via WhatsApp
        </a>
      )}
      {custom_link && (
        <a href={custom_link} className="call-link">
          {button_text || 'Call HR'}
        </a>
      )}
    </div>
  );
};

export default JobDetails;
