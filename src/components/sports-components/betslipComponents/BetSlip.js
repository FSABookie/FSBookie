import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  bottom: 0;
  position: sticky;
`;

const BetSlipConntainer = styled.div`
  background-color: white;
  margin-left: 0.5em;
  margin-right: 0.5em;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  transform: ${({ open }) =>
    open ? "translateY(-10em)" : "translateY(-100%)"};
  height: ${({ open }) => (open ? "10em" : "3em")};
`;

function BetSlip() {
  const [toggled, setToggled] = useState(false);
  const { betSlip } = useSelector((state) => state.betSlip);

  //   const toggleBetSlip = () => {
  //     !toggled ? setToggled(true) : setToggled(false);
  //     console.log(toggled);
  //   };

  return (
    <Container>
      <BetSlipConntainer onClick={() => setToggled(!toggled)} open={toggled}>
        <div>{betSlip.length} Bet Slip</div>
      </BetSlipConntainer>
    </Container>
  );
}

export default BetSlip;
