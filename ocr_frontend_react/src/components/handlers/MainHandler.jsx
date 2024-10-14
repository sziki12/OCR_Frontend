import ThemeHandler from "./ThemeHandler";
import LoginHandler from "./LoginHandler";
import HouseholdState from "../states/HouseholdState";
import ReceiptState from "../states/ReceiptState";


export default function MainHandler({children}) {


    return (
        <>
            <ThemeHandler>
                <LoginHandler>
                    <HouseholdState>
                        <ReceiptState>
                            {children}
                        </ReceiptState>
                    </HouseholdState>
                </LoginHandler>
            </ThemeHandler>
        </>
    )
}