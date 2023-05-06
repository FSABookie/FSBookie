import React from "react";
import Projections from "../../src/components/projections";
import { useGetNBAQuery } from "../../src/redux/slices/apiSlice";
import Loader from "../../src/components/Loader";
import Head from "next/head";

const NBA = () => {
  const { data: games, error, isLoading } = useGetNBAQuery();

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>NBA</title>
      </Head>
      <Projections games={games} sport={"NBA"} />
    </>
  );
};

export default NBA;
