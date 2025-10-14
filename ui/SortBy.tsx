import { useSearchParams } from "react-router";
import Select from "./Select";

function SortBy({ options }: { options: { value: string; label: string }[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") || "";
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sort", event.target.value);
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
