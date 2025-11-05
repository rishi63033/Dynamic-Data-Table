"use client";
import { TableHead, TableRow, TableCell, TextField } from "@mui/material";
import { User } from "@/types/user";

interface TableHeaderProps {
  columns: (keyof User | string)[];
  sortColumn: keyof User | string | null;
  sortOrder: "asc" | "desc";
  searchFilters: Record<string, string>; // string keys to allow dynamic columns
  onSort: (column: keyof User | string) => void;
  onSearchChange: (column: string, value: string) => void; // updated to pass column & value
}

export default function TableHeader({
  columns,
  sortColumn,
  sortOrder,
  searchFilters,
  onSort,
  onSearchChange,
}: TableHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, idx) => (
  <TableCell
    key={`${column}-${idx}`}
    onClick={() => onSort(column)}
    style={{ cursor: "pointer" }}
  >
    {column.charAt(0).toUpperCase() + column.slice(1)}{" "}
    {sortColumn === column ? (sortOrder === "asc" ? "↑" : "↓") : "⇅"}
  </TableCell>
))}

      </TableRow>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column}>
            <TextField
              fullWidth
              size="small"
              placeholder={`Search ${column}...`}
              value={searchFilters[column] || ""}
              onChange={(e) => onSearchChange(column, e.target.value)}
            />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
