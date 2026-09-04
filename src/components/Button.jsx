export default function Button ({children, onClick}){

    return (

        <button onClick={onClick}
                type="button"
                className="bg-button text-secondary text-sm font-bold rounded-lg py-3 px-5 cursor-pointer transition-colors hover:bg-buttonHover duration-200 active:scale-95"
        >{children}
        </button>
    
    );

}
