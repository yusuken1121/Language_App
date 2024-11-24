"use client";
type PaginationListType = {
  totalPage: number;
};

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { createQueryString } from "@/lib/createQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

const PaginationList: FC<PaginationListType> = ({ totalPage }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || 1);

  const handlePageChange = (page: number) => {
    router.push(
      pathname + "?" + createQueryString(searchParams, "page", String(page))
    );
  };
  return (
    <Pagination>
      <PaginationContent>
        {/* previous page */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
        )}
        {/* page 1 */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              isActive={currentPage === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* show ellipsis if there are more than 3 pages and the current page is greater than 3 */}
        {currentPage > 3 && totalPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* previous page number */}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* current page */}
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>

        {/* next page number */}
        {currentPage < totalPage - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* show ellipsis if there are more than 3 pages and the current page is far from the last page */}
        {currentPage < totalPage - 2 && totalPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* final page */}
        {totalPage > 1 && currentPage < totalPage && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(totalPage)}
              isActive={currentPage === totalPage}
            >
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* next page */}
        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationList;
