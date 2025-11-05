"use client";
import { useState, useMemo } from "react";
import { User } from "@/types/user";

export function useTableLogic(users: User[], visibleColumns: (keyof User | string)[] = []) {
  const columns = visibleColumns; // only use visible columns

  const [sortColumn, setSortColumn] = useState<keyof User | string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>(
    Object.fromEntries(columns.map(col => [col, ""]))
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredUsers = users.filter(user =>
    columns.every(col =>
      String(user[col as keyof User] ?? "").toLowerCase().includes((searchFilters[col] || "").toLowerCase())
    )
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn as keyof User] ?? "";
    const bVal = b[sortColumn as keyof User] ?? "";
    if (typeof aVal === "number" && typeof bVal === "number") return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    return sortOrder === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
  });

  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSort = (column: keyof User | string) => {
    if (sortColumn === column) setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return {
    columns,
    sortColumn,
    sortOrder,
    searchFilters,
    setSearchFilters,
    sortedUsers,
    paginatedUsers,
    handleSort,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage
  };
}
