import { useState } from "react";

const HavaintoForm = ({ updateHavainto, havainto }) => {
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

  const uHavainto = (event) => {
    event.preventDefault();

    updateHavainto({
      id: havainto.id,
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
    <form onSubmit={uHavainto}>
      <input
        id="laji"
        value={laji}
        placeholder="Laji"
        onChange={handleLajiChange}
      />
      <input
        id="paikka"
        value={paikka}
        placeholder="Paikka"
        onChange={handlePaikkaChange}
      />
      <input
        id="paiva"
        value={paiva}
        placeholder="Paiva"
        onChange={handlePaivaChange}
      />
      <input
        id="aika"
        value={aika}
        placeholder="Aika"
        onChange={handleAikaChange}
      />
      <input
        id="maara"
        value={maara}
        placeholder="Maara"
        onChange={handleMaaraChange}
      />
      <input
        id="kommentti"
        placeholder="Kommentti"
        onChange={handleKommenttiChange}
      />
      <button type="submit">Tallenna</button>
    </form>
  );
};

export default HavaintoForm;
