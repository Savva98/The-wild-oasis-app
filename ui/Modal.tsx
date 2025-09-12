import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { ModalContextType } from "../types/types";
import OpenModalButton from "./Button";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  z-index: 1300;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1200;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext<ModalContextType | null>(null);

function Modal({ children }: { children: React.ReactNode }) {
  const [openModal, setIsOpen] = useState<boolean | string>(false);
  const onClose = () => {
    if (typeof openModal === "string") {
      setIsOpen("");
      return;
    }
    setIsOpen(false);
    return;
  };
  const onOpen = (modal?: string) => {
    if (modal) {
      setIsOpen(modal);
      return;
    }
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: openModal,
        onOpen,
        onClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function ModalOpenButton({
  text,
  children,
}: {
  text?: string;
  children?: React.ReactNode;
}) {
  const { onOpen } = useContext(ModalContext) || {};
  if (!children) {
    return (
      <OpenModalButton
        variant="primary"
        size="large"
        onClick={() => onOpen && onOpen()}
      >
        {text}
      </OpenModalButton>
    );
  }
  return <div>{children}</div>;
}

function ModalContent({
  children,
  name,
}: {
  children: React.ReactNode;
  name?: string;
}) {
  const { isOpen, onClose } = useContext(ModalContext) || {};
  if (!isOpen) return null;
  if (typeof isOpen === "string" && isOpen !== name) return null;
  if (typeof isOpen === "boolean" && name) return null;
  return createPortal(
    <>
      <Overlay onClick={onClose} />
      <StyledModal>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </>,
    document.body
  );
}

Modal.OpenButton = ModalOpenButton;
Modal.Content = ModalContent;
export { Modal, ModalContext };
