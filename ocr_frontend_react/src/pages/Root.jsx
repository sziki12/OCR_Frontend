import logo from '../logo.svg';
import {Outlet} from "react-router-dom";
import MainSection from "../components/utils/MainSection";


//props.name
function Root() {
  return (
      <MainSection>
        <div>
          <Outlet/>
        </div>
      </MainSection>
  );
}

export default Root;
