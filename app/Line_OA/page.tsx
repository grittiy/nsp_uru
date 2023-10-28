'use client'

import { Box, Button, Card, CardMedia, Container, Grid, Stack, ThemeProvider, Toolbar, colors, createTheme, } from '@mui/material';
import React from 'react';
import { Mali } from 'next/font/google'


const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const theme = createTheme({
  palette: {
    warning: {
      main: '#fff',
      contrastText: '#fff'
    }
  }
})

const LineoaPage: React.FC = () => {
  return (
    <>
    
      <Container maxWidth="md">
        <Grid container spacing={2}>
            <Grid item xs={12} >
          <Box>
          <Toolbar />
              <Card sx={{ backgroundColor: "#43a047" }}>

                <CardMedia
                  component="img"
                  height="140"
                  image="/images/urud.png"
                  title="paper lineOA"
                />
                <Stack direction="row" spacing={2} m={1} >
                  <ThemeProvider theme={theme}>
                    <Button href="https://line.me/ti/p/~776cnnvc" variant="outlined" color="warning" size="large" sx={{ fontWeight: 700, border: 2, fontFamily: prompt.style.fontFamily, marginLeft: "10%" }}>
                      LINE
                    </Button>
                  </ThemeProvider>
                </Stack>
              </Card>
          </Box>
            </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LineoaPage;