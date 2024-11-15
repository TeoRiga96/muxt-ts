import React from "react";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

interface Props {
  name: string;
  region: string;
  population: number;
  flag: string;
  capital: string;
  languages: {};
  maps: {googleMaps:string};
  timezones: string;
}

const Card = ({
  name,
  region,
  population,
  flag,
  capital,
  languages,
  maps,
  timezones,
}: Props) => {
  const router = useRouter();
  // Definisci l'URL su cui vuoi mostrare il bottone
  const showButtonOnPath = "/cardDetails/[name]";
  return (
    <MuiCard sx={{ maxWidth: "20vw", marginBottom: "2rem", marginX:"1rem" }}>
      <CardMedia sx={{ height: "15vh" }} image={flag} title="green iguana" />
      <CardContent>
        <Typography
          sx={{ fontSize: "1rem", fontWeight: 700 }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <b>Population: </b>
          {population}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <b>Region: </b>
          {region}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <b>Capital: </b>
          {capital}
        </Typography>
      </CardContent>
      {router.pathname !== showButtonOnPath ? (
        <CardActions>
          <Button size="small">
            <Link href={`/cardDetails/${name}`}>Learn More</Link>
          </Button>
        </CardActions>
      ) : (
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <b>Languages: </b>
            {
              <ul>
                {languages && Object.entries(languages).map(([code, lang]) => (
                  <li key={code}>
                    {code}: {lang}
                  </li>
                ))}
              </ul>
            }
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <b>Timezones: </b>
            {timezones}
          </Typography>
          <CardActions>
            <Button size="small">
              <Link href={`${maps.googleMaps}`} passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  Google maps
                </a>
              </Link>
            </Button>
            <Button size="small">
              <Link href={`/`}>Home</Link>
            </Button>
          </CardActions>
        </CardContent>
      )}
    </MuiCard>
  );
};

export default Card;
