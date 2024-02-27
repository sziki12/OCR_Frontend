import logo from '../logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSection from "./utils/MainSection";

//props.name
function Root() {
  return (
      <MainSection>
        <div>
          <h1>Root Page</h1>
        </div>
      </MainSection>
  );
}

export default Root;
