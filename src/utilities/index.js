import { parse, formatDistance } from "date-fns";


export function FetchDate(publishedAt)
{
    
     
    const parsedDate = parse(publishedAt, "MMM dd, yyyy", new Date());
    const timeGap = formatDistance(parsedDate, new Date(), {
    addSuffix: true
    });
    return timeGap
}


