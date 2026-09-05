const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default async function CreateOrder (order){
    const response = await fetch(`${API_URL}/orders`,
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
