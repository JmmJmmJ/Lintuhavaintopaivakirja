import React from "react";
import { useState, useEffect } from "react";
import Havainto from "./components/Havainto";
import HavaintoForm from "./components/HaivaintoForm";
import havainnotService from "./services/havainnot";

const App = () => {
  const hav = [
    {
      id: "1",
      laji: "Harakka",
      paikka: "Alajärvi",
      paiva: "30.3.2022",
      aika: "16:05",
      maara: 4,
      kommentit: "Lumi sadetta",
    },
    {
      id: "2",
      laji: "Varis",
      paikka: "Alajärvi",
      paiva: "29.3.2022",
      aika: "12.24",
      maara: 3,
      kommentit: "Lunta",
    },
  ];

  const [havainnot, setHavainnot] = useState(hav);
  const [search, setFilter] = useState("");

  useEffect(() => {
    havainnotService.getAll().then((havainnot) => setHavainnot(havainnot));
  }, []);

  const addHavainto = (havainto) => {
    havainnotService.create(havainto).then((returnedHavainto) => {
      setHavainnot(havainnot.concat(returnedHavainto));
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
