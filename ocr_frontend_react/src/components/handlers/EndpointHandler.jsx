import {useNavigate} from "react-router-dom";
import {AuthService} from "../../dist/services/AuthService";
import AuthEndpoint from "../../dist/endpoints/AuthEndpoint";
import HouseholdEndpoint from "../../dist/endpoints/HouseholdEndpoint";
import ReceiptEndpoint from "../../dist/endpoints/ReceiptEndpoint";
import ItemEndpoint from "../../dist/endpoints/ItemEndpoint";
import PlaceEndpoint from "../../dist/endpoints/PlaceEndpoint";
import ImageProcessingEndpoint from "../../dist/endpoints/ImageProcessingEndpoint";
import OcrResponseEndpoint from "../../dist/endpoints/OcrResponseEndpoint";
import ReceiptImageEndpoint from "../../dist/endpoints/ReceiptImageEndpoint";
import FilterEndpoint from "../../dist/endpoints/FilterEndpoint";
import StatisticEndpoint from "../../dist/endpoints/StatisticEndpoint";


export default function EndpointHandler({children}){
    return(<>
        <AuthService>
            <AuthEndpoint>
                <HouseholdEndpoint>
                    <ReceiptEndpoint>
                        <ItemEndpoint>
                            <PlaceEndpoint>
                                <ImageProcessingEndpoint>
                                    <OcrResponseEndpoint>
                                        <ReceiptImageEndpoint>
                                            <FilterEndpoint>
                                                <StatisticEndpoint>
                                                    {children}
                                                </StatisticEndpoint>
                                            </FilterEndpoint>
                                        </ReceiptImageEndpoint>
                                    </OcrResponseEndpoint>
                                </ImageProcessingEndpoint>
                            </PlaceEndpoint>
                        </ItemEndpoint>
                    </ReceiptEndpoint>
                </HouseholdEndpoint>
            </AuthEndpoint>
        </AuthService>
    </>)
}