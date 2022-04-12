import React from "react";
import { useState, useEffect } from "react";
import Havainto from "./components/Havainto";
import HavaintoForm from "./components/HaivaintoForm";
import havainnotService from "./services/havainnot";
import loginService from "./services/login";

const App = () => {
  const [havainnot, setHavainnot] = useState([]);
  const [searchL, setFilterL] = useState("");
  const [searchP, setFilterP] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [filterYear, setFilterYear] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      havainnotService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("loggedUser")) {
      havainnotService.getAll().then((havainnot) => setHavainnot(havainnot));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      console.log(user.token);
      havainnotService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      window.localStorage.setItem("userToken", `bearer ${user.token}`);
      setUsername("");
      setPassword("");
      havainnotService.getAll().then((havainnot) => setHavainnot(havainnot));
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

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
    const date = new Date(havaintoToRemove.paiva);
    if (
      window.confirm(
        `Poista havainto ${havaintoToRemove.laji} ${date.toLocaleDateString()}`
      )
    ) {
      havainnotService.del(id).then(() => {
        setHavainnot(havainnot.filter((havainto) => havainto.id !== id));
      });
    }
  };

  const updateHavainto = (havainto) => {
    const date = new Date(havainto.paiva);
    if (
      window.confirm(
        `Muokkaa havaintoa ${havainto.laji} ${date.toLocaleDateString()}`
      )
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

  const havainnotFilter = () => {
    if (searchL === "" && searchP !== "") {
      return havainnot.filter((havainto) =>
        havainto.paikka.toLowerCase().startsWith(searchP)
      );
    } else if (searchL !== "" && searchP === "") {
      return havainnot.filter((havainto) =>
        havainto.laji.toLowerCase().startsWith(searchL)
      );
    } else if (searchL !== "" && searchP !== "") {
      return havainnot.filter(
        (havainto) =>
          havainto.laji.toLowerCase().startsWith(searchL) &&
          havainto.paikka.toLowerCase().startsWith(searchP)
      );
    } else {
      return havainnot;
    }
  };

  const havainnotFilterYear = () => {
    const startDate = new Date(`${filterYear}-01-01`);
    const endDate = new Date(`${filterYear}-12-31`);
    const havainnotFromDay = havainnot.filter((havainto) => {
      const date = new Date(havainto.paiva);
      return date >= startDate && date <= endDate;
    });
    setHavainnot(havainnotFromDay);
  };

  const filterYearReset = () => {
    havainnotService.getAll().then((havainnot) => setHavainnot(havainnot));
  };

  const handleFilterChange = (event) => {
    setFilterL(event.target.value);
  };

  const handleFilterPChange = (event) => {
    setFilterP(event.target.value);
  };

  const handleFilterYearChange = (event) => {
    setFilterYear(event.target.value);
  };

  const sortTableA = (column) => {
    setHavainnot(
      havainnot
        .concat()
        .sort((a, b) =>
          a[column].toLowerCase().localeCompare(b[column].toLowerCase())
        )
    );
  };

  function dateComparison(a, b) {
    const date1 = new Date(a);
    const date2 = new Date(b);

    return date1 - date2;
  }

  const sortTableD = () => {
    setHavainnot(
      havainnot.concat().sort((a, b) => dateComparison(a.paiva, b.paiva))
    );
  };

  if (user === null) {
    return (
      <div className="loginScreen">
        <title>Kirjaudu</title>
        <div className="container">
          <div className="login">
            <form onSubmit={handleLogin}>
              <div className="inputBox">
                <h2 className="text">Kirjaudu sisään</h2>
                <p className="text">Käyttäjätunnus</p>
                <input
                  className="loginInput"
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
                <p className="text">Salasana</p>
                <input
                  className="loginInput"
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <div className="bt">
                <button type="submit" className="loginButton">
                  Kirjaudu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <Notification message={errorMessage} />
      <div className="header">
        <h1>Havainnot</h1>
        {user.name}
        <button onClick={logout} className="logoutButton">
          Kirjaudu ulos
        </button>
      </div>
      <HavaintoForm addHavainto={addHavainto} />
      <input
        id="filter"
        placeholder="Suodata laji"
        onChange={handleFilterChange}
      />
      <input
        id="filter"
        placeholder="Suodata paikka"
        onChange={handleFilterPChange}
      />
      <input onChange={handleFilterYearChange} placeholder="Vuosi"></input>
      <button onClick={havainnotFilterYear}>Filter vuosi</button>
      <button onClick={filterYearReset}>Reset</button>
      <table className="havainnot-table">
        <thead>
          <tr>
            <th onClick={() => sortTableA("laji")}>Laji</th>
            <th onClick={() => sortTableA("paikka")}>Paikka</th>
            <th onClick={sortTableD}>Päivämäärä</th>
            <th>Aika</th>
            <th>Määrä</th>
            <th>Kommentit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {havainnotFilter().map((havainto) => (
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
