import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 20;
    width: 100%;
    background-color: #e0e0de;
    border-radius: 50px;
    margin: 50;
  `;

  const Filler = styled.div`
    height: 100%;
    background-color: orange;
    border-radius: inherit;
    text-align: right;
  `;

  const Label = styled.span`
    padding: 5;
    color: white;
    font-weight: bold;
  `;

const ProgressBar = ({completed}) => {
//   const { completed } = props;
  return (
    <Container>
      <Filler style={{width: `${completed}%`}}>
        <Label>{`${completed}%`}</Label>
      </Filler>
    </Container>
  );
};

export default ProgressBar;