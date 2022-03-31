import React from "react";
import { useState } from "react";
import Havainto from "./components/Havainto";
import HavaintoForm from "./components/HaivaintoForm";

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

  const addHavainto = (havainto) => {
    setHavainnot(havainnot.concat(havainto));
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

  return (
    <div className="content">
      <h1>Havainnot</h1>
      <HavaintoForm addHavainto={addHavainto} />
      <input id="filter" placeholder="Suodata" onChange={handleFilterChange} />
      <table className="havainnot-table">
        <thead>
          <tr>
            <th>Laji</th>
            <th>Paikka</th>
            <th>Päivämäärä</th>
            <th>Aika</th>
            <th>Lukumäärä</th>
            <th>Kommentit</th>
          </tr>
        </thead>
        <tbody>
          {havainnotFilter.map((havainto) => (
            <Havainto key={havainto.id} havainto={havainto} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
