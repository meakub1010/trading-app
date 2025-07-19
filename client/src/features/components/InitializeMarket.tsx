
export const InitializeMarket = () => {

    function initMarket(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        // Example: Initialize market logic here
        // This could be an API call or state update
        console.log("Market initialized!");
        // TODO: Replace with actual initialization logic
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