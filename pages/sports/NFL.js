import React, { useEffect } from "react";
import { useGetNFLQuery } from "../../src/redux/slices/apiSlice";
import MainContainer from "../../src/components/sports-components/MainContainer";
import axios from "axios";

function Football() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetNFLQuery();

  const sport = "NFL";

  return <MainContainer data={{ data, sport }} />;
}

export default Football;
