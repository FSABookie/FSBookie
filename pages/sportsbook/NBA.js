import React from "react";
import { useGetNBAQuery } from "../../src/redux/slices/apiSlice";
import Sportsbook from "../../src/components/Sportsbook";
import Loader from "../../src/components/Loader";
import Head from "next/head";

function Basketball() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetNBAQuery();

  const sport = "NBA";

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>NBA</title>
      </Head>
      <Sportsbook data={{ data, sport }} />
    </>
  );
}

export default Basketball;
