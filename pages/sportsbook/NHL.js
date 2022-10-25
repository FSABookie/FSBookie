import React from "react";
import Loader from "../../src/components/Loader";
import Sportsbook from "../../src/components/Sportsbook";
import { useGetNHLQuery } from "../../src/redux/slices/apiSlice";

function Hockey() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetNHLQuery();

  const sport = "NHL";

  return isLoading ? <Loader /> : <Sportsbook data={{ data, sport }} />;
}

export default Hockey;
