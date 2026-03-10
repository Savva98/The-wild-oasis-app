import Heading from "../ui/Heading";
import Row from "../ui/Row";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
const fpPromise = FingerprintJS.load();
async function fingerPrintFunction() {
  const fp = await fpPromise;
  const result = await fp.get();
  console.log(result.visitorId);
}
function Dashboard() {
  function handleClick() {
    fingerPrintFunction();
  }
  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <button onClick={handleClick}>TEST</button>
    </Row>
  );
}

export default Dashboard;
