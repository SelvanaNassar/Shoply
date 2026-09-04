export default function useSort (items, filterByOption){ 

    const sortedItems = [...items]

      if(filterByOption === "PriceLowtoHigh"){
        sortedItems.sort((a, b)=> a.price - b.price)
      }

      if(filterByOption === "PriceHightoLow"){
        sortedItems.sort((a, b)=> b.price - a.price)
      }

      if(filterByOption === "RatingHightoLow"){
        sortedItems.sort((a, b)=> b.rating - a.rating)
      }

      if(filterByOption === "DiscountHighestFirst"){
        sortedItems.sort((a, b)=> b.discountPercentage - a.discountPercentage)
      }

      if(filterByOption === "DiscountLowestFirst"){
        sortedItems.sort((a, b)=> a.discountPercentage - b.discountPercentage)
      }

      return {sortedItems}
}
