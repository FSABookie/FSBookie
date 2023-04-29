import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 20vh;
  background-color: #19181a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .mobile-row-1 {
    color: white;
    font-size: 0.65em;
    margin-bottom: 2%;
  }

  .mobile-row-2 {
    color: #757475;
    font-style: italic;
    font-size: 0.65em;
    display: flex;
    align-items: center;
  }
`;

function Footer() {
  return (
    <Container>
      <div className="mobile-row-1">
        Terms of Use ~ Privacy Policy ~ Responsible Gaming
      </div>
      <div className="mobile-row-2">
        <Image src="/FSbookie.png" width="20" height="20" alt="img" />
        &nbsp; 2022 - 2023 FSABookie All Rights Reserved.
      </div>
    </Container>
  );
}

export default Footer;
