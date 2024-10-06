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
        // setLoading(false);
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
      <h1>{company_name || 'Company Name'} - {job_role || 'Job Role'}</h1>
      <h2>Location: {job_location_slug || 'Location'}</h2>
      <p>Salary: {amount || 'N/A'}</p>
      <p>Experience Required: {experienceValue}</p>
      <p>Qualification Required: {qualificationValue}</p>
      <p>Contact Preference: {contact_preference || 'N/A'}</p>
      <p>WhatsApp Number: {whatsapp_no || 'N/A'}</p>
      <p>Other Details: {other_details || 'N/A'}</p>
      <a href={custom_link} className="apply-button" target="_blank" rel="noopener noreferrer">
        {button_text || 'Apply Now'}
      </a>
      {/* You can display job creatives if necessary */}
      {creatives && <img src={creatives[0]} alt="Job Creative" className="job-creative" />}
    </div>
  );
};

export default JobDetails;
