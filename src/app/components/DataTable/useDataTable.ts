import { useState, useEffect } from "react";
import { User } from "@/types/user";
import Papa from "papaparse";

export function useDataTable(defaultUser: User) {
  const [users, setUsers] = useState<User[]>([]);
  const [dynamicColumns, setDynamicColumns] = useState<(keyof User | string)[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<(keyof User | string)[]>(["name", "age"]);
  const [allColumns, setAllColumns] = useState<(keyof User | string)[]>(["name", "email", "age", "role"]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    const savedVisibleColumns = localStorage.getItem("visibleColumns");

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    else setUsers([{ name: "John Doe", age: 30 }]); // default row

    if (savedVisibleColumns) setVisibleColumns(JSON.parse(savedVisibleColumns));
  }, []);

  // Save to localStorage whenever users or visibleColumns change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
  }, [users, visibleColumns]);

const handleImportCSV = (file?: File) => {
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: results => {
      const parsedData = results.data as Record<string, any>[];
      if (!parsedData.length) return;

      // Only include columns that exist in the new CSV
      const newCols = Object.keys(parsedData[0]).filter(c => c && c.trim() !== "");

      // Reset all columns to match new CSV
      setAllColumns(newCols);
      setDynamicColumns(newCols);
      setVisibleColumns(newCols);

      // Filter out completely empty rows
      const validData = parsedData.filter(row =>
        Object.values(row).some(val => val !== null && val !== "")
      );

      setUsers(validData);
    },
    error: err => alert(err.message)
  });
};

  const handleExportCSV = () => {
    const exportData = users.map(user => {
      const row: Record<string, any> = {};
      visibleColumns.forEach(col => (row[col] = user[col as keyof User] ?? ""));
      return row;
    });
    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users_export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAddColumn = (column: string) => {
    if (!allColumns.includes(column)) setAllColumns(prev => [...prev, column]);
    if (!visibleColumns.includes(column)) setVisibleColumns(prev => [...prev, column]);
    if (!dynamicColumns.includes(column)) setDynamicColumns(prev => [...prev, column]);
  };

  const handleToggleColumn = (column: string) => {
    setVisibleColumns(prev =>
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    );
  };

  return {
    users,
    visibleColumns,
    allColumns,
    dynamicColumns,
    handleAddColumn,
    handleToggleColumn,
    handleImportCSV,
    handleExportCSV,
    setUsers
  };
}
