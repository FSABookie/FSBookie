import React from "react";
import Sportsbook from "../../src/components/Sportsbook";
import { useGetMLBQuery } from "../../src/redux/slices/apiSlice";

function Baseball() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetMLBQuery();

  const sport = "MLB";

  return <Sportsbook data={{ data, sport }} />;
}

export default Baseball;
