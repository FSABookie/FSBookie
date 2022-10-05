import React, { useEffect } from "react";
import styled from "styled-components";
import { useGetMLBQuery } from "../src/redux/slices/apiSlice";

const Container = styled.div``;

export default function Home() {
  const { data, isSuccess } = useGetMLBQuery();

  useEffect(() => {
    isSuccess && console.log(data);
  }, [isSuccess, data]);

  return <Container>YO!!! LMFAOOO @_@</Container>;
}
