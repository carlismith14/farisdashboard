import logo from "./logo.svg";
import "./App.css";

import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material";

import { Desktop, Mobile } from "./components/utility/responsive";
import DataPage from "./components/DataPage";
import LeftPanel3 from "./components/LeftPanel3";

function App() {
  return (
    <div >
      <Desktop>
        <LeftPanel3></LeftPanel3>
      </Desktop>

      <Mobile>
        <DataPage></DataPage>
      </Mobile>
    </div>
  );
}

export default App;
