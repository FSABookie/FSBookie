import React from "react";
import Loader from "../../src/components/Loader";
import Sportsbook from "../../src/components/Sportsbook";
import { useGetNHLQuery } from "../../src/redux/slices/apiSlice";
import Head from "next/head";

function Hockey() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetNHLQuery();

  const sport = "NHL";

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>NHL</title>
      </Head>
      <Sportsbook data={{ data, sport }} />
    </>
  );
}

export default Hockey;
