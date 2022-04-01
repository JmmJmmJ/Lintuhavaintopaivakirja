const Havainto = ({ havainto, removeHavainto }) => {
  return (
    <tr>
      <td>{havainto.laji}</td>
      <td>{havainto.paikka}</td>
      <td>{havainto.paiva}</td>
      <td>{havainto.aika}</td>
      <td>{havainto.maara}</td>
      <td>{havainto.kommentit}</td>
      <td>
        {" "}
        <button onClick={removeHavainto}>delete</button>
      </td>
    </tr>
  );
};

export default Havainto;
