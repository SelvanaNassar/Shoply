export default function FormatCategory (category){

    return category
           .split("-").map(word=> word.charAt(0).toUpperCase() + word.slice(1))
           .join(" ")
           .replace("Mens", "Men's")
           .replace("Womens", "Women's")
           
}
