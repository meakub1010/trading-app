import { marketApi } from "../../api/marketApi";

export const SimulateMarket = () => {
    function startSimulation(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        marketApi.startSimulation();
        console.log("Market simulation started.");
    } return (
        <button className="btn btn-primary" onClick={startSimulation}>Simulate Market</button>
    );
};