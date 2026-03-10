import { useState } from "react";
import { Form } from "react-router";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import Button from "../../ui/Button";

function MFACodeInput() {
  const [mfaCode, setMfaCode] = useState("");
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // Here you would typically send the MFA code to the server for verification
  // };
  return (
    <Form>
      <FormRowVertical label="MFA code">
        <Input
          type="text"
          id="mfa-code"
          name="mfa-code"
          value={mfaCode}
          onChange={(e) => setMfaCode(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">Login</Button>
      </FormRowVertical>
    </Form>
  );
}

export default MFACodeInput;
