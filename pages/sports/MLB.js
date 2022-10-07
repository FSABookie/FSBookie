import React from "react";
import MainContainer from "../../src/components/sports-components/MainContainer";
import { useGetMLBQuery } from "../../src/redux/slices/apiSlice";

function Baseball() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetMLBQuery();

  const sport = "MLB";

  return <MainContainer data={{ data, sport }} />;
}

export default Baseball;
