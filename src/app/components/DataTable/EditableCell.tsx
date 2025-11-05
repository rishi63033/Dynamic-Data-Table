"use client";
import { useState, useEffect, useRef } from "react";
import { TableCell, TextField } from "@mui/material";

interface EditableCellProps {
  value: any;
  rowIndex: number;
  column: string;
  onChange: (rowIndex: number, column: string, value: any) => void;
  editingAll?: boolean;
  validation?: (value: any) => boolean;
}

export default function EditableCell({
  value,
  rowIndex,
  column,
  onChange,
  editingAll = false,
  validation,
}: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setCellValue(value), [value]);

  useEffect(() => {
    if ((editing || editingAll) && inputRef.current) inputRef.current.focus();
  }, [editing, editingAll]);

  const handleSave = () => {
    if (validation && !validation(cellValue)) {
      setError("Invalid value");
      return;
    }
    setError("");
    onChange(rowIndex, column, cellValue);
    setEditing(false);
  };

  const handleBlur = () => handleSave();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setCellValue(value);
      setEditing(false);
      setError("");
    }
  };

  return (
    <TableCell onDoubleClick={() => setEditing(true)}>
      {(editing || editingAll) ? (
        <TextField
          fullWidth
          size="small"
          value={cellValue ?? ""}
          onChange={(e) => setCellValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
          error={!!error}
          helperText={error}
        />
      ) : (
        value ?? ""
      )}
    </TableCell>
  );
}
