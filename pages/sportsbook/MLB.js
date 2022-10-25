import React from "react";
import Loader from "../../src/components/Loader";
import Sportsbook from "../../src/components/Sportsbook";
import { useGetMLBQuery } from "../../src/redux/slices/apiSlice";

function Baseball() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetMLBQuery();

  const sport = "MLB";

  return isLoading ? <Loader /> : <Sportsbook data={{ data, sport }} />;
}

export default Baseball;
