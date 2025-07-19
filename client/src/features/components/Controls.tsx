import { memo } from "react";
import { InitializeMarket } from "./InitializeMarket";
import { SimulateMarket } from "./SimulateMarket";
import { StopMarket } from "./StopMarket";

export const Controlls = memo(() => {

    console.log('Controls');
    
    return (
        <>
            <div className="d-flex justify-content-end gap-2">
                <InitializeMarket />
                <SimulateMarket />
                <StopMarket />
            </div>
            
        </>
    );
});