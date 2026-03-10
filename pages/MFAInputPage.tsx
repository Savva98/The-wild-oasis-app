import styled from "styled-components";
import MFACodeInput from "../features/authentication/MFACodeInput";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const MFALayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function MFAInputPage() {
  return (
    <MFALayout>
      <Logo />
      <Heading as="h4">Enter your MFA code from your authenticator app</Heading>
      <MFACodeInput />
    </MFALayout>
  );
}

export default MFAInputPage;
