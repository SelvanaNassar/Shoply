import { Star, StarHalf} from "lucide-react"

export default function RatingStars ( {rating} ){

  const fullStars = Math.floor(rating);

  const decimal = rating % 1;

  let extraStars = 0;

  let halfStar = 0;
    
    if (decimal < 0.25){
      //nothing
    }

    if (decimal >= 0.25 && decimal < 0.75){
      halfStar = 1;
    }

    if (decimal >= 0.75){
      extraStars = 1;
    }

    const totalFullStars = fullStars + extraStars;

    const emptyStars = 5- totalFullStars - halfStar

    return (
      
      <div className="flex justify-center items-center">
        
        {Array.from({length:totalFullStars}).map((_,index)=> (
            <Star key={`full_${index}`} className="fill-rating stroke-rating size-5"/>
            )
        )}

        {halfStar === 1 ?
            <div className="relative">
            <StarHalf className="absolute fill-rating stroke-rating size-5"/> 
            <Star className="top-0 stroke-border fill-border size-5"/>
            </div>
        : ""
        }

        {Array.from({length:emptyStars}).map((_,index)=> (
            <Star key={`empty_${index}`} className="fill-border stroke-border size-5"/>
            )
        )}
      
      </div>

    );
}

  
