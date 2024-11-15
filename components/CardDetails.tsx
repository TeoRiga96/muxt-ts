import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { CountrySearch } from "./CountrySearch";

interface Props {
  name: string;
}

interface CountryData {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  population: number;
  region: string;
  capital: string[];
  languages: {};
  maps: {};
  timezones: string;
}

export const CardDetails = ({ name }: Props) => {
  const [data, setData] = useState<CountryData[] | null>(null);

  useEffect(() => {
    // Definisci una funzione asincrona per fare il fetch
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Errore nel fetch:", error);
      }
    };

    // Chiama fetchData solo se `name` è disponibile
    if (name) {
      fetchData();
    }
  }, [name]); // Aggiorna quando `name` cambia

  return (
    <Box
      sx={{
        padding: "5rem",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
        <Box>

      {data && (
        <Card
          name={data[0].name.common}
          flag={data[0].flags.png}
          population={data[0].population}
          region={data[0].region}
          capital={data[0].capital[0]}
          languages={data[0].languages}
          maps={data[0].maps}
          timezones={data[0].timezones}
        />
      )}
        </Box>
        
    </Box>
  );
};
