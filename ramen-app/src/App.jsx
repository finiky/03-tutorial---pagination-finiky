import { useState, useEffect } from "react";
import Controls from "./components/Controls";
import ReviewList from "./components/ReviewList";
import PageControls from "./components/PageControls";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/reviews?limit=${limit}&page=${page}`
        );

        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews);
          setTotalPages(data.totalPages);
        } else {
          throw Error("Fetch response not ok!");
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchReviews();
  }, [limit, page]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Ramen Reviews</h1>
      </header>

      <hr />

      <Controls limit={limit} setLimit={setLimit} />

      <ReviewList reviews={reviews} />

      <PageControls page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default App;