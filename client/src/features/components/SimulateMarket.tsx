import { use, useCallback } from "react";
import { marketApi } from "../../api/marketApi";

export const SimulateMarket = () => {
    console.log("SimulateMarket component loaded");

    const handleSimulation = useCallback(async () => {
        console.log("Simulation button clicked");
        try {
            await marketApi.startSimulation();
        } catch (error) {
            console.error("Error starting market simulation:", error);
        }
    }, []);
    
    return (
        <button className="btn btn-primary" onClick={handleSimulation}>Simulate Market</button>
    );
};