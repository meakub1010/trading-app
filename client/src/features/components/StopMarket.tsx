
export const StopMarket = () => {

    function stopSimulation(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        // Add logic to stop the market simulation here
        // For example, you might dispatch a Redux action or call a context method
        console.log("Simulation stopped.");
    } 
    
    return (
        <button className="btn btn-primary" onClick={stopSimulation}>Stop</button>
    );
}