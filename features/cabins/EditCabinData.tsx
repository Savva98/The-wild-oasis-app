import { useContext } from "react";
import { EditCabinFormType } from "../../types/types";
import { Modal, ModalContext } from "../../ui/Modal";
import EditCabinForm from "./EditCabinForm";

function EditCabinData({ cabin }: { cabin: EditCabinFormType }) {
  const { isOpen } = useContext(ModalContext) || {};
  if (!isOpen) return null;
  return (
    <Modal.Content>
      <EditCabinForm cabin={cabin} />
    </Modal.Content>
  );
}

export default EditCabinData;
