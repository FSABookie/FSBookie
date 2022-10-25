import React, { useEffect } from "react";
import { useGetNFLQuery } from "../../src/redux/slices/apiSlice";
import Sportsbook from "../../src/components/Sportsbook";
import Loader from "../../src/components/Loader";

function Football() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetNFLQuery();

  const sport = "NFL";

  return isLoading ? <Loader /> : <Sportsbook data={{ data, sport }} />;
}

export default Football;
