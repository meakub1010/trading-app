import { marketApi } from "../../api/marketApi";

export const StopMarket = () => {

    function stopSimulation(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        marketApi.stopSimulation();
        console.log("Simulation stopped.");
    } 
    
    return (
        <button className="btn btn-primary" onClick={stopSimulation}>Stop</button>
    );
}