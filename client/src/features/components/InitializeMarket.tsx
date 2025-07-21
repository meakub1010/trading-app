import { marketApi } from "../../api/marketApi";

export const InitializeMarket = () => {

    function initMarket(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        console.log("Market initialized!");
        marketApi.initMarket();
    }


     function stopSimulation(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        // Add logic to stop the market simulation here
        // For example, you might dispatch a Redux action or call a context method
        console.log("Simulation stopped.");
    } 

    return (
        <button className="btn btn-primary" onClick={initMarket}>Init Market</button>
    )
};