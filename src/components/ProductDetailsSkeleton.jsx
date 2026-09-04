export default function ProductDetailsSkeleton (){

    return (
        <div className="min-h-screen mx-2 lg:mx-5">

            <div className="my-7 bg-border rounded-lg h-4 w-64 animate-pulse"></div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5">

                <div className="w-full lg:w-[10%] flex flex-row lg:flex-col justify-center lg:justify-start gap-5">

                    {Array(4).fill(0).map((_, index) => (
                        <div key={index}
                             className="size-[80px] lg:size-[100px] bg-border rounded-lg animate-pulse"
                        ></div>
                    ))}

                </div>
                
                <div className="w-[80%] lg:w-[40%] h-[300px] lg:h-[500px] shadow-sm bg-border rounded-lg flex items-center justify-center">
                    <div className="w-[90%] h-[80%] object-contain bg-primary/30 rounded-lg animate-pulse"></div>
                </div>

                <div className="w-full lg:w-[50%]">
                    <div className="flex items-center justify-center lg:justify-start mb-5">
                        <div className="h-8 w-3/4 bg-border rounded-lg animate-pulse"></div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">

                        <div className="h-5 w-24 bg-border rounded-lg animate-pulse"></div>

                        <div className="h-4 w-10 bg-border rounded-lg animate-pulse"></div>

                        <div className="h-4 w-24 bg-border rounded-lg animate-pulse"></div>

                    </div>
                    
                    <div className="flex items-center justify-center lg:justify-start gap-5 mb-5"> 

                        <div className="h-4 w-full bg-border rounded-lg animate-pulse"></div>
                        <div className="h-4 w-full bg-border rounded-lg animate-pulse"></div>
                        <div className="h-4 w-full bg-border rounded-lg animate-pulse"></div>

                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-3 mb-5">

                        <div className="w-[70%] lg:w-1/3 h-14 bg-border rounded-lg animate-pulse"></div>

                        <div className="w-[70%] lg:w-1/3 h-14 bg-border rounded-lg animate-pulse"></div>

                        <div className="w-[70%] lg:w-1/3 h-14 bg-border rounded-lg animate-pulse"></div>

                    </div>


                    <div className="mb-5 flex items-center justify-center lg:justify-start bg-border rounded-lg animate-pulse"></div>

                    <div className="grid grid-cols-2 gap-3 mb-5 w-full">
                        {Array(4).fill(0).map((_, index) => (
                            <div key={index}
                                 className="h-20 bg-border rounded-lg animate-pulse"
                            ></div>
                        ))}
                    </div>

                </div>
                
            </div>
        </div>
    );
}

