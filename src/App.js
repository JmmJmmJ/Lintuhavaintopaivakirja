import React from "react";
import { useState, useEffect } from "react";
import Havainto from "./components/Havainto";
import HavaintoForm from "./components/HaivaintoForm";
import havainnotService from "./services/havainnot";

const App = () => {
  const [havainnot, setHavainnot] = useState([]);
  const [search, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    havainnotService.getAll().then((havainnot) => setHavainnot(havainnot));
  }, []);

  const addHavainto = (havainto) => {
    havainnotService
      .create(havainto)
      .then((returnedHavainto) => {
        setHavainnot(havainnot.concat(returnedHavainto));
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const removeHavainto = (id) => {
    const havaintoToRemove = havainnot.find((h) => h.id === id);
    if (
      window.confirm(
        `Poista havainto ${havaintoToRemove.laji} ${havaintoToRemove.paiva}`
      )
    ) {
      havainnotService.del(id).then(() => {
        setHavainnot(havainnot.filter((havainto) => havainto.id !== id));
      });
    }
  };

  const updateHavainto = (havainto) => {
    if (
      window.confirm(`Muokkaa havaintoa ${havainto.laji} ${havainto.paiva}`)
    ) {
      havainnotService
        .update(havainto.id, havainto)
        .then((returnedHavainto) => {
          setHavainnot(
            havainnot.map((hav) =>
              hav.id !== havainto.id ? hav : returnedHavainto
            )
          );
        });
    }
  };

  const Notification = ({ message, clas }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  const havainnotFilter =
    search === ""
      ? havainnot
      : havainnot.filter((havainto) =>
          havainto.laji.toLowerCase().startsWith(search)
        );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const sortLaji = (event) => {
    setHavainnot(
      havainnot
        .concat()
        .sort((a, b) =>
          a.laji.toLowerCase().localeCompare(b.laji.toLowerCase())
        )
    );
  };

  return (
    <div className="content">
      <Notification message={errorMessage} />
      <h1>Havainnot</h1>
      <HavaintoForm addHavainto={addHavainto} />
      <input id="filter" placeholder="Suodata" onChange={handleFilterChange} />
      <table className="havainnot-table">
        <thead>
          <tr>
            <th onClick={sortLaji}>Laji</th>
            <th>Paikka</th>
            <th>Päivämäärä</th>
            <th>Aika</th>
            <th>Määrä</th>
            <th>Kommentit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {havainnotFilter.map((havainto) => (
            <Havainto
              key={havainto.id}
              havainto={havainto}
              removeHavainto={() => removeHavainto(havainto.id)}
              updateHavainto={updateHavainto}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
