// import styled from "styled-components";
import { useCabinsByQuery } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { CabinType } from "../../types/types";
import Empty from "../../ui/Empty";
function CabinTable() {
  const { data: cabinsByQuery, isLoading: isLoadingByQuery } =
    useCabinsByQuery();
  if (isLoadingByQuery) {
    return <Spinner />;
  }
  if (!cabinsByQuery?.data || cabinsByQuery.data.length === 0) {
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
          data={cabinsByQuery.data}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
