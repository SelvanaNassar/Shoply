import { useNavigate } from "react-router-dom";

import EmptyState from "../components/EmptyState.jsx";

import { ArrowLeft, UserRound } from "lucide-react";

export default function Signin() {

    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center gap-5 m-5">
            
            <EmptyState icon={UserRound}
                        title="Sign in is coming soon"
                        description="We're working on making your shopping experience even better."
            />

            <button onClick={()=> navigate("/shop")} 
                    className="bg-secondary border-border border-2 rounded-lg px-5 py-3 mt-4 flex gap-1 items-center"
            >
                <ArrowLeft />
                Continue shopping
            </button>

        </div>
    );
}