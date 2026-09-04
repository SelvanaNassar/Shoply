import Button from "./Button"

export default function ErrorState ({errorMessage, retry, children}){
    
    return(

        <div className="flex flex-col items-center justify-center py-10 text-center">
        
            <p className="text-secondaryText mb-4">{errorMessage}</p>
        
            <Button onClick={retry}>{children}</Button>
        
        </div>

    );

}
