import { useState } from "react";
import { User } from "@/types/user";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";

interface ManageColumnsModalProps {
  open: boolean;
  onClose: () => void;
  columns: (keyof User)[];
  visibleColumns: (keyof User | string)[];
  onToggleColumn: (column: keyof User | string) => void;
  onAddColumn: (column: string) => void; // new prop for adding
}

export default function ManageColumnsModal({
  open,
  onClose,
  columns,
  visibleColumns,
  onToggleColumn,
  onAddColumn
}: ManageColumnsModalProps) {
  const [newColumn, setNewColumn] = useState("");

  const handleAdd = () => {
    if (newColumn && !visibleColumns.includes(newColumn)) {
      onAddColumn(newColumn);
      setNewColumn("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        {Array.from(new Set([...columns, ...visibleColumns])).map((col, idx) => (
          <FormControlLabel
            key={`${col}-${idx}`} // unique key using index
            control={
              <Checkbox
                checked={visibleColumns.includes(col)}
                onChange={() => onToggleColumn(col)}
              />
            }
            label={col}
          />
        ))}


        <TextField
          placeholder="Add new column"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleAdd} variant="contained">
          Add Column
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
