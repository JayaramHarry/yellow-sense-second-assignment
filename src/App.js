
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Jobs from './components/Jobs';
// import Bookmarks from './components/Bookmarks';
// import JobDetails from './components/JobDetails';
// import './App.css';

// const App = () => {
//   const [bookmarks, setBookmarks] = useState([]);

//   // Load bookmarks from local storage on component mount
//   useEffect(() => {
//     const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
//     console.log('Loaded bookmarks from local storage:', storedBookmarks); // Debugging line
//     setBookmarks(storedBookmarks);
//   }, []);

//   // Save bookmarks to local storage whenever they change
//   useEffect(() => {
//     if (bookmarks.length > 0) {
//       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//       console.log('Bookmarks saved to local storage:', bookmarks); // Debugging line
//     }
//   }, [bookmarks]);

//   const handleBookmark = job => {
//     setBookmarks(prevBookmarks => {
//       const isAlreadyBookmarked = prevBookmarks.some(bm => bm.id === job.id);
//       if (isAlreadyBookmarked) {
//         return prevBookmarks.filter(bm => bm.id !== job.id);
//       } else {
//         return [...prevBookmarks, job];
//       }
//     });
//   };

//   const handleRemoveBookmark = jobId => {
//     setBookmarks(prevBookmarks => prevBookmarks.filter(job => job.id !== jobId));
//   };

//   return (
//     <Router>
     
//       <div className="App">
//         <Routes>
//           <Route
//             path="/bookmarks"
//             element={<Bookmarks bookmarks={bookmarks} onRemoveBookmark={handleRemoveBookmark} />}
//           />
//           <Route
//             path="/"
//             element={<Jobs onBookmark={handleBookmark} bookmarks={bookmarks} />}
//           />
//           <Route
//             path="/jobs/:id"
//             element={<JobDetails />}
//           />
//         </Routes>

//         {/* Bottom navigation */}
//         <nav className="navbar">
//           <Link to="/">Jobs</Link>
//           <Link to="/bookmarks">Bookmarks</Link>
//         </nav>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';
import JobDetails from './components/JobDetails';
import './App.css';

const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load bookmarks from local storage on component mount
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    console.log('Loaded bookmarks from local storage:', storedBookmarks); // Debugging line
    setBookmarks(storedBookmarks);
  }, []);

  // Save bookmarks to local storage whenever they change
  useEffect(() => {
    if (bookmarks.length > 0) {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      console.log('Bookmarks saved to local storage:', bookmarks); // Debugging line
    }
  }, [bookmarks]);

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

  const handleRemoveBookmark = jobId => {
    setBookmarks(prevBookmarks => prevBookmarks.filter(job => job.id !== jobId));
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
            element={<Bookmarks bookmarks={bookmarks} onRemoveBookmark={handleRemoveBookmark} />}
          />
          <Route
            path="/"
            element={<Jobs onBookmark={handleBookmark} bookmarks={bookmarks} searchQuery={searchQuery} />}
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
