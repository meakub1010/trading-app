
export const SimulateMarket = () => {
    function startSimulation(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        // Simulate market logic here, e.g., dispatch an action or call an API
        console.log("Market simulation started.");
    } return (
        <button className="btn btn-primary" onClick={startSimulation}>Simulate Market</button>
    );
};