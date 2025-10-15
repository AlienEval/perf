
"use client";

import Link from "next/link";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] | undefined };
}

export function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
    
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(searchParams)) {
      if (key !== name && val) {
        if(typeof val === 'string') {
          params.set(key, val);
        } else if (Array.isArray(val)) {
          val.forEach(v => params.append(key, v));
        }
      }
    }
    params.set(name, value);
    return params.toString();
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage, endPage;
      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push(-1); // Ellipsis
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(-1); // Ellipsis
        }
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-12 flex justify-center">
      <ShadcnPagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/perfumes?${createQueryString('page', String(currentPage - 1))}`} />
            </PaginationItem>
          )}

          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === -1 ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={`/perfumes?${createQueryString('page', String(page))}`}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={`/perfumes?${createQueryString('page', String(currentPage + 1))}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </ShadcnPagination>
    </div>
  );
}
