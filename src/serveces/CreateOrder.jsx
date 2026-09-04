export default async function CreateOrder (order){
    const response = await fetch("https://hutch-scary-peacock.abasthan.app/orders",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        }
    );
    if(!response.ok){
        throw new Error("Failed to create order");
        
    }
    return response.json();
} 
