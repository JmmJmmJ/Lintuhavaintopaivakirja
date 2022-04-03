import React, { useState } from "react";
import HavaintoEditForm from "./HaivaintoEditForm";

const Havainto = ({ havainto, removeHavainto, updateHavainto }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const date = new Date(havainto.paiva);

  return (
    <React.Fragment>
      <tr onClick={toggleVisibility}>
        <td>{havainto.laji}</td>
        <td>{havainto.paikka}</td>
        <td>{date.toLocaleDateString()}</td>
        <td>{havainto.aika}</td>
        <td>{havainto.maara}</td>
        <td>{havainto.kommentit}</td>
        <td>
          <button onClick={removeHavainto}>poista</button>
        </td>
      </tr>
      <tr style={showWhenVisible}>
        <td colSpan="7">
          <HavaintoEditForm
            updateHavainto={updateHavainto}
            havainto={havainto}
          />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Havainto;
