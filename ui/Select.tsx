import styled from "styled-components";

const StyledSelect = styled("select").withConfig({
  shouldForwardProp: (prop) => !["type"].includes(prop),
})<{ type: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({
  options,
  value,
  type,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <StyledSelect value={value} type={type} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
