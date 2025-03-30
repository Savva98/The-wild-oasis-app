import React from "react";
import styled from "styled-components";
import ListMainNav from "./ListMainNav";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

function MainNav({ linksTo }: { linksTo: string[] }) {
  return (
    <nav>
      <NavList>
        {linksTo.map((link, index) => (
          <ListMainNav key={link} linkTo={link} index={index} />
        ))}
      </NavList>
    </nav>
  );
}

export default MainNav;
