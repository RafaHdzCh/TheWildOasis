import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings()
{
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const currentDate = new Date();
  const queryDate = subDays(currentDate, numDays).toISOString();

  const {isLoading, data: bookings} = useQuery(
    {
      queryFn: () => getBookingsAfterDate(queryDate),
      queryKey:["bookings", `last-${numDays}`]
    }
  )

  return {isLoading, bookings};
}