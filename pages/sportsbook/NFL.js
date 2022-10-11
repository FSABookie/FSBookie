import React, { useEffect } from "react";
import { useGetNFLQuery } from "../../src/redux/slices/apiSlice";
import Sportsbook from "../../src/components/Sportsbook";

function Football() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetNFLQuery();

  const sport = "NFL";

  return <Sportsbook data={{ data, sport }} />;
}

export default Football;
