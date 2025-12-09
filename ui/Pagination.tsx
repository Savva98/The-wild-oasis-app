import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router";
import { RESULTS_PER_PAGE } from "../utils/consts";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled("button").withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop),
})<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({
  results,
  hasMore,
}: {
  results: number;
  hasMore: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const cursor = localStorage.getItem("nextCursor");
  if (isNaN(page) || page < 1) {
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }
  const status = searchParams.get("status");
  const totalPages = Math.ceil(results / RESULTS_PER_PAGE);
  function setPage(page: number) {
    if (!status) {
      searchParams.set("status", "all");
    }
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  }
  function handleNext() {
    if (!hasMore) return;
    if (searchParams.get("direction") === "previous") {
      searchParams.delete("direction");
    }
    const next = page === totalPages ? page : page + 1;
    setPage(next);
  }
  function handlePrevious() {
    const previous = page === 1 ? page : page - 1;
    searchParams.set("direction", "previous");
    if (page - 1 === 1 && status === "all") {
      searchParams.delete("direction");
    }
    setPage(previous);
  }

  if (totalPages <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(page - 1) * RESULTS_PER_PAGE + 1}</span> to{" "}
        <span>{page === totalPages ? results : RESULTS_PER_PAGE * page}</span>{" "}
        of <span>{results} </span>
        results
      </P>
      <Buttons>
        <PaginationButton disabled={page === 1} onClick={handlePrevious}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton disabled={!hasMore} onClick={handleNext}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
