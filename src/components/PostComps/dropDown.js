import React, { useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  font-family: sans-serif;
  height: 100%;
`;

const DropDownContainer = styled.div`
  width: 100%;
`;

const DropDownHeader = styled.div`
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  border: 1px solid #e5e5e5;
`;

const DropDownListContainer = styled.div``;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  padding: 0em 1em 0em 1em;
  border: 2px solid #e5e5e5;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
  position: absolute;
  z-index: 1;
  background-color: black;
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
  left: 0;
  top: 100%;
  width: 100%;
  cursor: pointer;
`;

export default function DropDown({ options, setFilter, filter }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setFilter(value);
    setIsOpen(false);
  };

  return (
    <Main>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {filter ? filter : "Default"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => (
                <ListItem key={option} onClick={onOptionClicked(option)}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </Main>
  );
}
