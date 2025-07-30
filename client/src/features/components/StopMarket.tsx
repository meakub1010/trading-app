import { useCallback } from "react";
import { marketApi } from "../../api/marketApi";

export const StopMarket = () => {
    console.log("StopMarket component loaded");

    // Improvement: Use useCallback to memoize the function

    const handleStopSimulation = useCallback(async () => {
        console.log("Stop button clicked");
        try {
            await marketApi.stopSimulation();
        } catch (error) {
            console.error("Error stopping market simulation:", error);
        }
    }, []);
    
    return (
        <button className="btn btn-primary" onClick={handleStopSimulation}>Stop</button>
    );
}