
// import './App.css'
import { CssBaseline, ThemeProvider } from "@mui/material";
import Theme from "./Theme/Theme"

import WeatherApp from "./Components/Weatherapp";




function App() {
 

  return (
    <>
       <ThemeProvider theme={Theme}>
        <CssBaseline />
       <WeatherApp/>
      </ThemeProvider>
    </>
  )
}

export default App
