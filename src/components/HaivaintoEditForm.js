import { useState } from "react";

const HavaintoForm = ({ updateHavainto, havainto }) => {
  const date = new Date(havainto.paiva);

  const [laji, setLaji] = useState(havainto.laji);
  const [paikka, setPaikka] = useState(havainto.paikka);
  const [paiva, setPaiva] = useState(`${date.toLocaleDateString()}`);
  const [aika, setAika] = useState(havainto.aika);
  const [maara, setMaara] = useState(havainto.maara);
  const [kommentti, setKommentti] = useState(havainto.kommentit);

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

  const splitDate = (date) => {
    const parts = date.split(".");
    return `${parts[1]}/${parts[0]}/${parts[2]}`;
  };

  const uHavainto = (event) => {
    event.preventDefault();

    updateHavainto({
      id: havainto.id,
      laji: laji,
      paikka: paikka,
      paiva: splitDate(paiva),
      aika: aika,
      maara: maara,
      kommentit: kommentti,
    });
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
        value={kommentti}
        placeholder="Kommentti"
        onChange={handleKommenttiChange}
      />
      <button type="submit">Tallenna</button>
    </form>
  );
};

export default HavaintoForm;
