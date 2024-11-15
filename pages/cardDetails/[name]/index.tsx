import { Box } from "@mui/material";
import React from "react";
import Header from "../../../components/Header";
import { CardDetails } from "../../../components/CardDetails";
import { useRouter } from "next/router";


const index = () => {

  // uso useRouter perchè è la versione vecchia
  const router = useRouter()
  console.log(router.query.name)


  return (
    <Box>
      <Header />
      <CardDetails name={router.query.name as string} />
    </Box>
  );
}; 

export default index;
