import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
        <div>Filter/Sort</div>
      </Row>
      <Row type="vertical">
        <CabinTable />
        <Button
          variant="primary"
          size="large"
          onClick={() => setShowForm(true)}
        >
          Add new cabin
        </Button>
        {showForm && (
          <CreateCabinForm
            isOpen={showForm}
            onClose={() => setShowForm(false)}
          />
        )}
      </Row>
    </>
  );
}

export default Cabins;
