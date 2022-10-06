import React from "react";
import { useGetNBAQuery } from "../../src/redux/slices/apiSlice";
import MainContainer from "../../src/components/sports-components/MainContainer";

function Basketball() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetNBAQuery();

  const sport = "NBA";

  console.log(data);

  return <MainContainer data={{ data, sport }} />;
}

export default Basketball;
