import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const arrayOfIcons = [
  <HiOutlineHome />,
  <HiOutlineCalendarDays />,
  <HiOutlineHomeModern />,
  <HiOutlineUsers />,
  <HiOutlineCog6Tooth />,
];

function ListMainNav({ linkTo, index }: { linkTo: string; index: number }) {
  const user = { role: "guest" }; // Mock user object for demonstration
  // Check if the user is an admin and the link is "users"
  return (
    <li>
      {user.role === "admin" || linkTo !== "users" ? (
        <StyledNavLink to={linkTo}>
          {arrayOfIcons[index] ? arrayOfIcons[index] : <></>}
          <span>
            {linkTo === "dashboard"
              ? "Home"
              : linkTo.charAt(0).toUpperCase() + linkTo.slice(1)}
          </span>
        </StyledNavLink>
      ) : null}
    </li>
  );
}

export default ListMainNav;
