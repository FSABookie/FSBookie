import React from "react";
import { useGetNBAQuery } from "../../src/redux/slices/apiSlice";
import Sportsbook from "../../src/components/Sportsbook";

function Basketball() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetNBAQuery();

  const sport = "NBA";

  console.log(data);

  return <Sportsbook data={{ data, sport }} />;
}

export default Basketball;
