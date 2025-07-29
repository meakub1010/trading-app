import { useCallback } from "react";
import { marketApi } from "../../api/marketApi";

export const InitializeMarket = () => {
    console.log("InitializeMarket component loaded");

    // function initMarket(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    //     event.preventDefault();
    //     console.log("Market initialized!");
    //     marketApi.initMarket();
    // }

    const handleInitMarket = useCallback(async () => {
        console.log("Initialize button clicked");
        try {
            await marketApi.initMarket();
        }
        catch (error) {
            console.error("Error initializing market:", error);
        }
    }, []); 

    return (
        <button className="btn btn-primary" onClick={handleInitMarket}>Init Market</button>
    )
};