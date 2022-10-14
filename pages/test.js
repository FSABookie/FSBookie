import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 20;
    width: 100%;
    background-color: #e0e0de;
    border-radius: 50;
    margin: 50;
  `;

  const Filler = styled.div`
    height: 100%;
    width: 20%;
    background-color: orange;
    border-radius: inherit;
    text-align: right;
  `;

  const Label = styled.span`
    padding: 5;
    color: 'white';
    font-weight: bold;
  `;

const Test = ({completed}) => {
//   const { completed } = props;
  return (
    <Container>
      <Filler>
        <Label>{`20%`}</Label>
        <p>TESTING</p>
      </Filler>
    </Container>
  );
};

export default Test;