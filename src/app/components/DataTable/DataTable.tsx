"use client";
import { Table, TableBody, TableRow, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { User } from "@/types/user";
import TableHeader from "./TableHeader";
import TablePaginationBar from "./TablePaginationBar";
import ManageColumnsModal from "./ManageColumnsModal";
import EditableCell from "./EditableCell";
import { useDataTable } from "./useDataTable";
import { useTableLogic } from "./useTableLogic";

export default function DataTable() {
  const defaultUser: User = { name: "", email: "", age: 0, role: "" };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    users,
    visibleColumns,
    allColumns,
    dynamicColumns,
    handleToggleColumn,
    handleAddColumn,
    handleCellChange,
    handleImportCSV,
    handleExportCSV,
    setUsers,
  } = useDataTable(defaultUser);

  const [tempUsers, setTempUsers] = useState(users);

  useEffect(() => {
    setTempUsers(users);
  }, [users]);

  const handleCellChangeTemp = (rowIndex: number, column: string, value: any) => {
    if (column === "age" && isNaN(Number(value))) return; // validation
    const updated = [...tempUsers];
    updated[rowIndex] = { ...updated[rowIndex], [column]: value };
    setTempUsers(updated);
  };

  const handleSaveAll = () => {
    setUsers(tempUsers);
    alert("Changes saved!");
  };

  const handleCancelAll = () => {
    setTempUsers(users);
    alert("Changes canceled!");
  };

  const {
    columns,
    paginatedUsers,
    sortedUsers,
    sortColumn,
    sortOrder,
    searchFilters,
    setSearchFilters,
    handleSort,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
  } = useTableLogic(tempUsers, dynamicColumns);

  return (
    <>
      <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>Manage Columns</Button>
        <Button variant="contained" color="primary" onClick={handleSaveAll}>Save All</Button>
        <Button variant="outlined" color="secondary" onClick={handleCancelAll}>Cancel All</Button>
        <Button variant="contained" component="label">
          Import CSV
          <input type="file" hidden accept=".csv" onChange={(e) => handleImportCSV(e.target.files?.[0])} />
        </Button>
        <Button variant="contained" onClick={handleExportCSV}>Export CSV</Button>
      </div>

      <Table>
        <TableHeader
          columns={visibleColumns}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          searchFilters={searchFilters}
          onSort={handleSort}
          onSearchChange={(col, val) => setSearchFilters(prev => ({ ...prev, [col]: val }))}
        />
        <TableBody>
          {paginatedUsers.map((user, rowIndex) => (
            <TableRow key={rowIndex}>
              {visibleColumns.map(col => (
                <EditableCell
                  key={`${col}-${rowIndex}`}
                  value={user[col as keyof User]}
                  rowIndex={rowIndex}
                  column={col}
                  onChange={handleCellChangeTemp}
                  validation={col === "age" ? (val) => !isNaN(Number(val)) : undefined}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePaginationBar
        count={sortedUsers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={e => setRowsPerPage(parseInt(e.target.value, 10))}
      />

      <ManageColumnsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        columns={allColumns}
        visibleColumns={visibleColumns}
        onToggleColumn={handleToggleColumn}
        onAddColumn={handleAddColumn}
      />
    </>
  );
}
