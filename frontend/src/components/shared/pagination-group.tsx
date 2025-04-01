import { Dispatch, SetStateAction, useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui";

interface Props {
  countPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const PaginationGroup: React.FC<Props> = ({
  countPage,
  page,
  setPage,
}) => {
  const decrease = () => setPage((page) => Math.max(1, page - 1));
  const increase = () =>
    setPage((page) => Math.min(page + 1, Math.ceil(countPage / 4)));

  const totalPages = Math.ceil(countPage / 4);
  const pagesArray = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => decrease()}
              className={
                page == 1 ? "hover:cursor-no-drop " : "hover:cursor-pointer"
              }
              color="red"
              aria-disabled={page === 1}
            />
          </PaginationItem>
          {pagesArray.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={page === pageNumber}
                onClick={() => setPage(pageNumber)}
                className="hover:cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => increase()}
              className={
                page > Math.ceil(countPage / 4) - 1
                  ? "hover:cursor-no-drop "
                  : "hover:cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
