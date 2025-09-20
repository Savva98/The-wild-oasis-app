import { useSearchParams } from "react-router";
import Select from "./Select";

function SortBy({ options }: { options: { value: string; label: string }[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={sortBy}
      type={"grey"}
      onChange={handleChange}
    />
  );
}

export default SortBy;
