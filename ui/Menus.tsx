import styled from "styled-components";

import { createContext, useCallback, useContext, useState } from "react";
import { MenusContextType } from "../types/types";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { ModalContext } from "./Modal";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button<{ id: string }>`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul.withConfig({
  shouldForwardProp: (prop) => !["position", "id"].includes(prop),
})<{
  position: { x: number; y: number };
  id: string;
}>`
  position: absolute;
  z-index: 1200;
  list-style: none;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext<MenusContextType | null>(null);

function Menus({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const onOpen = (id: string) => {
    setIsOpen(id);
  };

  const onClose = useCallback(() => {
    setIsOpen(null);
  }, []);
  return (
    <MenuContext.Provider
      value={{ isOpen, onOpen, onClose, position, setPosition }}
    >
      <div>{children}</div>
    </MenuContext.Provider>
  );
}
function Toggle({ id }: { id: string }) {
  const { isOpen, onOpen, onClose, setPosition } =
    useContext(MenuContext) || {};
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (e.target instanceof Element) {
      const rect = e.target.closest("button")?.getBoundingClientRect();
      setPosition?.(
        rect
          ? {
              x: window.innerWidth - rect.width * 3 - rect.x,
              y: rect.height + (rect.bottom - rect.top) + 3,
            }
          : null
      );
    }
    if (isOpen === "" || isOpen !== id) onOpen?.(id);
    if (isOpen === id) {
      onClose?.();
      return;
    }
  }
  return (
    <StyledToggle onClick={handleClick} id={id} aria-expanded={isOpen === id}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }: { id: string; children: React.ReactNode }) {
  const { isOpen, position } = useContext(MenuContext) || {};
  if (isOpen !== id) {
    return null;
  }
  return createPortal(
    <StyledList position={position ? position : { x: 0, y: 0 }} id={id}>
      {children}
    </StyledList>,
    document.querySelector('[data-id="' + id + '"]') || document.body
  );
}
function Button({
  children,
  icon,
  execute,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  execute?: string;
}) {
  const { onOpen } = useContext(ModalContext) || {};
  const { onClose } = useContext(MenuContext) || {};
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onOpen?.(execute ? execute : undefined);
    onClose?.();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}
Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
