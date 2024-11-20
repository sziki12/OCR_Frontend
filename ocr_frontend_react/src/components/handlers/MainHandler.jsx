import ThemeHandler from "./ThemeHandler";
import LoginHandler from "./LoginHandler";
import HouseholdState from "../states/HouseholdState";
import ReceiptState from "../states/ReceiptState";
import EndpointHandler from "./EndpointHandler";


export default function MainHandler({children}) {


    return (
        <EndpointHandler>
            <ThemeHandler>
                <LoginHandler>
                    <HouseholdState>
                        <ReceiptState>
                            {children}
                        </ReceiptState>
                    </HouseholdState>
                </LoginHandler>
            </ThemeHandler>
        </EndpointHandler>)
}