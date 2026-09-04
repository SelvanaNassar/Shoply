export default async function CreateOrder (order){
    const response = await fetch("http://192.168.1.104:3000/orders",
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
