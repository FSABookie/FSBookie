import React from "react";
import { useGetNHLQuery } from "../../src/redux/slices/apiSlice";
import MainContainer from "../../src/components/sports-components/MainContainer";

function Hockey() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetNHLQuery();

  const sport = "NHL";

  return <MainContainer data={{ data, sport }} />;
}

export default Hockey;
