import styled from "styled-components";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
`;

function Applaout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default Applaout;
