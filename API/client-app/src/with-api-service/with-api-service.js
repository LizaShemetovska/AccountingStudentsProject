import React from "react";
import { ApiStoreServiceConsumer} from "../components/api-service-context/api-service-context";

const WithApiService = () => (Wrapped) => {
    return (props) => {
        return (
            <ApiStoreServiceConsumer>
                {
                    (apiStoreService) => {
                        return(
                        <Wrapped {... props} apiStoreService={apiStoreService} />
                        );
                    }
                }
            </ApiStoreServiceConsumer>
        )
    }
}
export { WithApiService }