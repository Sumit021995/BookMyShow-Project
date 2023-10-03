import React, { useEffect, useState } from "react";
import "../styles/bootstrap.min.css";
import { movies, slots, seats } from "./data";
import "./App.css";

// localstorage handling for reloading data
const handleReloadPage = () => {
  let data = localStorage.getItem("movieData");
  if (data) {
    return JSON.parse(localStorage.getItem("movieData"));
  } else {
    return {
      movie: "",
      slot: "",
      seats: {
        A1: 0,
        A2: 0,
        A3: 0,
        A4: 0,
        D1: 0,
        D2: 0,
      },
    };
  }
};

const App = () => {
  // Data managing object
  const [movieData, setMovieData] = useState(handleReloadPage);
  localStorage.setItem("movieData", JSON.stringify(movieData));

  const [bookedSlot, setBookedSlot] = useState([]);

  // Select movie and set to localStorage -
  const selectMovie = (movie) => {
    setMovieData({ ...movieData, movie: movie });
    localStorage.setItem("movieData", JSON.stringify(movieData));
  };

  // Select movie time slot and set to localStorage -
  const selectTime = (time) => {
    setMovieData({ ...movieData, slot: time });
    localStorage.setItem("movieData", JSON.stringify(movieData));
  };

  //Select seats and set to localStorage -
  const selectSeats = (value, seat) => {
    setMovieData({
      ...movieData,
      seats: { ...movieData.seats, [seat]: parseInt(value.target.value) },
    });
    localStorage.setItem("movieData", JSON.stringify(movieData));
  };

  // Now book show-
  const bookShow = () => {
    if (movieData.movie === "") {
      alert("Please Select Movie!");
    } else if (movieData.slot === "") {
      alert("Please select movie time!");
    } else if (
      movieData.seats.A1 ||
      movieData.seats.A2 ||
      movieData.seats.A3 ||
      movieData.seats.A4 ||
      movieData.seats.D1 ||
      movieData.seats.D2
    ) {
      console.log(movieData);
      // Geting data
      saveDataToDatabase(movieData);
      setMovieData({
        movie: "",
        slot: "",
        seats: {
          A1: 0,
          A2: 0,
          A3: 0,
          A4: 0,
          D1: 0,
          D2: 0,
        },
      });
    } else {
      alert("Please choose a movie seat!");
    }
  };

  // Get Request:- Get old data from dataBase
  const getDataFromDatabase = () => {
    fetch("/api/booking")
      .then((response) => response.json())
      .then((data) => setBookedSlot(data))
      .catch((err) => alert("Error occurred from server!"));
  };

  // Post request:- storing user data to dataBase
  const saveDataToDatabase = async () => {
    const response = await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify(movieData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const content = await response.json();
    if (content._id) {
      alert("Your show booked successfully ");
      getDataFromDatabase();
    } else alert("Something is wrong!");
  };

  // Fetching data as page reloading
  useEffect(() => {
    getDataFromDatabase();
  }, []);

  return (
    <>
      <div>
        <div className="container mt-5">
          <h1 className="text-center pb-1">Book My Show</h1>
          <div className="row main_block p-4 pb-2">
            <div className="col-8">
              {/*- Select Movie Section -*/}

              <div className="movies p-2 m-2 pb-4">
                <h4 className="py-2 px-3">Select A Movie</h4>
                {movies &&
                  movies.map((elem, index) => (
                    <button
                      key={index}
                      className={`btn mx-3 my-1 
                    ${movieData.movie === elem ? "btn btn-danger" : ""}`}
                      onClick={() => selectMovie(elem)}
                    >
                      {elem}
                    </button>
                  ))}
              </div>

              {/* -Select Time Section - */}

              <div className="slot p-2 m-2 pb-4">
                <h4 className="py-2 px-3">Select A Time Slot</h4>
                {slots &&
                  slots.map((time, num) => (
                    <button
                      key={num}
                      className={`btn mx-3
                    ${movieData.slot === time ? "btn btn-danger" : ""}`}
                      onClick={() => selectTime(time)}
                    >
                      {time}
                    </button>
                  ))}
              </div>

              {/* - Select Seat Section - */}

              <div className="seats p-1 m-2 pb-3">
                <h4 className="px-3 py-2 ">Select the Seats</h4>
                <div className="row">
                  {seats &&
                    seats.map((item, index) => (
                      <div
                        key={index}
                        className="col mx-3 seat_col text-center p-1 ms-4 pb-2"
                      >
                        <h6>{item}</h6>
                        <input
                          onChange={(e) => selectSeats(e, item)}
                          type="number"
                          value={movieData.seats[item]}
                          min="0"
                          max="10"
                          style={{ width: "2.8rem" }}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* - Submit or Book Now Button - */}

              <button
                className="btn btn-outline-primary mx-3 mt-2"
                onClick={bookShow}
              >
                Book Now
              </button>
            </div>
            <div className="col-4">
              {/* - Last Booking Details -*/}

              <div className="lastbooking p-3 m-2">
                <h4 className="text-center pb-3">Last Booking Details:</h4>
                {bookedSlot.length !== 0 ? (
                  bookedSlot.map((elem, index) => (
                    <div
                      key={index}
                      className="border rounded px-3 py-3 bg-light text-secondary"
                      style={{ lineHeight: "3px" }}
                    >
                      <p>
                        <span className="lastBook">seats:</span>
                      </p>
                      <p>
                        <span className="lastBook">A1: </span>
                        <span>{elem.seats.A1}</span>
                      </p>
                      <p>
                        <span className="lastBook">A2: </span>
                        <span>{elem.seats.A2}</span>
                      </p>
                      <p>
                        <span className="lastBook">A3: </span>
                        <span>{elem.seats.A3}</span>
                      </p>
                      <p>
                        <span className="lastBook">A4: </span>
                        <span>{elem.seats.A4}</span>
                      </p>
                      <p>
                        <span className="lastBook">D1: </span>
                        <span>{elem.seats.D1}</span>
                      </p>
                      <p>
                        <span className="lastBook">D2: </span>
                        <span>{elem.seats.D2}</span>
                      </p>
                      <p>
                        <span className="lastBook">slot: </span>
                        <span>{elem.slot}</span>
                      </p>
                      <p>
                        <span className="lastBook">movie: </span>
                        <span style={{lineHeight:"18px"}}>{elem.movie}</span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-danger text-center">
                    No Previous Booking Found!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
