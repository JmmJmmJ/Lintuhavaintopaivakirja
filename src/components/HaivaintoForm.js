import { useState } from "react";

const HavaintoForm = ({ addHavainto }) => {
  const [laji, setLaji] = useState("");
  const [paikka, setPaikka] = useState("");
  const [paiva, setPaiva] = useState("");
  const [aika, setAika] = useState("");
  const [maara, setMaara] = useState("");
  const [kommentti, setKommentti] = useState("");

  const handleLajiChange = (event) => {
    setLaji(event.target.value);
  };

  const handlePaikkaChange = (event) => {
    setPaikka(event.target.value);
  };

  const handlePaivaChange = (event) => {
    setPaiva(event.target.value);
  };

  const handleAikaChange = (event) => {
    setAika(event.target.value);
  };

  const handleMaaraChange = (event) => {
    setMaara(event.target.value);
  };

  const handleKommenttiChange = (event) => {
    setKommentti(event.target.value);
  };

  const createHavainto = (event) => {
    event.preventDefault();

    addHavainto({
      id: 3,
      laji: laji,
      paikka: paikka,
      paiva: paiva,
      aika: aika,
      maara: maara,
      kommentit: kommentti,
    });
    setLaji("");
    setPaikka("");
    setPaiva("");
    setAika("");
    setMaara("");
    setKommentti("");
  };

  return (
    <form onSubmit={createHavainto}>
      <input id="laji" placeholder="Laji" onChange={handleLajiChange} />
      <input id="paikka" placeholder="Paikka" onChange={handlePaikkaChange} />
      <input id="paiva" placeholder="Paiva" onChange={handlePaivaChange} />
      <input id="aika" placeholder="Aika" onChange={handleAikaChange} />
      <input id="maara" placeholder="Maara" onChange={handleMaaraChange} />
      <input
        id="kommentti"
        placeholder="Kommentti"
        onChange={handleKommenttiChange}
      />
      <button type="submit">Lisää</button>
    </form>
  );
};

export default HavaintoForm;
