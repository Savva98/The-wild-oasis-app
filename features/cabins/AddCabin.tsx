import { Modal } from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.OpenButton text="Add new cabin" />
      <Modal.Content>
        <CreateCabinForm />
      </Modal.Content>
    </Modal>
  );
}

export default AddCabin;
