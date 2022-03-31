const Havainto = ({ havainto }) => {
  return (
    <tr>
      <td>{havainto.laji}</td>
      <td>{havainto.paikka}</td>
      <td>{havainto.paiva}</td>
      <td>{havainto.aika}</td>
      <td>{havainto.maara}</td>
      <td>{havainto.kommentit}</td>
    </tr>
  );
};

export default Havainto;
