import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import { useStore } from "../store";

export const CountrySearch = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  // state per filtrare con il dropdown
  const [region, setRegion] = React.useState("");

  //   state per salvare i dati dal fetch
  const [data, setData] = useState([
    {
      name: { common: "" },
      flags: { png: "" },
      capital: [""],
      population: 0,
      region: "",
    },
  ]);
  //   state per salvare la ricerca del filtro
  const [filteredCountry, setFilteredCountry] = useState(data);
  //   state per salvare il valore inserito nel text-imput
  const [searchValue, setSearchValue] = useState("");

  //   funzione che setta il searchValue
  const handleTyping = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.target.value);
  };

  //   funzione che gestisce il filtro tramite regione nel menù dropdown
  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
    console.log(event.target.value);
  };
  // logica che controlla il filtro per paese nel campo di input e il filtro per regione
  useMemo(() => {
    let countries: React.SetStateAction<
      {
        name: { common: string };
        flags: { png: string };
        capital: string[];
        population: number;
        region: string;
      }[]
    > = [];

    if (region !== "") {
      countries = data.filter((country) => country.region === region);

      if (searchValue !== "") {
        setFilteredCountry(
          countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredCountry(countries);
      }
    } else if (region === "") {
      if (searchValue !== "") {
        setFilteredCountry(
          data.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredCountry(data);
      }
    }
  }, [data, searchValue, region]);

  //   qui andiamo a interrogare l'API e andiamo a salvare i dati dentro uno state
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
    ).then((response) =>
      response.json().then((data) => {
        setData(data);
        setFilteredCountry(data);
      })
    );
  }, []);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <TextField
          sx={{
            width: "40vw",
            backgroundColor: isDarkMode ? "#2b3743" : "#ffffff",
          }}
          id="outlined-basic"
          label="Search for country..."
          variant="outlined"
          onChange={(e) => {
            handleTyping(e);
          }}
        />

        <FormControl
          sx={{
            width: "20vw",
            backgroundColor: isDarkMode ? "2b3743" : "#ffffff",
          }}
        >
          <InputLabel id="demo-simple-select-label">
            Filter by Region
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="Region"
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">Americas</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {data && data.length > 0 ? (
          filteredCountry.map((country) => {
            return (
              <Card
                name={country.name.common}
                flag={country.flags.png}
                population={country.population}
                region={country.region}
                key={country.name.common}
                capital={country.capital[0]}
              />
            );
          })
        ) : (
          <Typography> No countries found</Typography>
        )}

        {/* filtro l'array di card */}
      </Box>
    </Box>
  );
};
