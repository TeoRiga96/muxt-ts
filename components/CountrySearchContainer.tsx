import { Box } from '@mui/material'
import React from 'react'
import Header from './Header'
import { CountrySearch } from './CountrySearch'

const CountrySearchContainer = () => {
  return (
    <Box >
        <Header/>
        <CountrySearch/>
    </Box>
  )
}

export default CountrySearchContainer