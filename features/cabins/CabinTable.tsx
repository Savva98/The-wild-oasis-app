// import styled from "styled-components";
import { useCabinsByQuery } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router";
import { CabinType } from "../../types/types";
import { sortingQuery } from "../../utils/helpers";
import Empty from "../../ui/Empty";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  const sortBy = sortingQuery(searchParams.get("sortBy") || "");
  const query = `${filterValue !== "all" ? `discount=${filterValue}` : ""}${
    sortBy ? `&sort=${sortBy}` : ""
  }`;
  const { data: cabinsByQuery, isLoading: isLoadingByQuery } = useCabinsByQuery(
    "cabins",
    query
  );
  if (isLoadingByQuery) {
    return <Spinner />;
  }
  if (!cabinsByQuery || cabinsByQuery.length === 0) {
    return <Empty resource="cabins" />;
  }

  return (
    <Menus>
      <Table columns="0.8fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body<CabinType>
          data={cabinsByQuery || ([] as CabinType[])}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
