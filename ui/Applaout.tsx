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
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
  overflow: auto;
  overflow-x: auto;
`;

const Conteiner = styled.div`
  display: flex;
  max-width: 140rem;
  flex-direction: column;
  gap: 3.2rem;
  margin: 0 auto;
`;

function Applaout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Conteiner>
          <Outlet />
        </Conteiner>
      </Main>
    </StyledAppLayout>
  );
}

export default Applaout;
