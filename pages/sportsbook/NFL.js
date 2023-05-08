import React, { useEffect } from "react";
import { useGetNFLQuery } from "../../src/redux/slices/apiSlice";
import Sportsbook from "../../src/components/Sportsbook";
import Loader from "../../src/components/Loader";
import Head from "next/head";

function Football() {
  const { data, error, isLoading, isSuccess, isFetching } = useGetNFLQuery();

  const sport = "NFL";

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>NFL</title>
      </Head>
      <Sportsbook data={{ data, sport }} />
    </>
  );
}

export default Football;
