export default function ProductCardSkeleton (){

    return (
        <div 
            className="bg-secondary border border-border rounded-lg text-center shadow-sm shadow-boxShadow relative"
        >
            
            <div className="bg-elements rounded-lg px-4 py-5 w-full aspect-square lg:aspect-[4/3] animate-pulse">
            </div>

            <div className="h-6 w-3/4 mx-auto my-3 bg-border rounded animate-pulse">
            </div>
            
            <div className="flex justify-center items-center">
                <div className="h-4 w-20 bg-border rounded animate-pulse">
                </div>
            </div>

            <div className="my-3 h-6 w-20 mx-auto bg-border rounded animate-pulse">
            </div>       

        </div>
    );

}
      



  
