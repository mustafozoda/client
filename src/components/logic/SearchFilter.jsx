import React from "react";
import {
  TextField,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
} from "@mui/material";
import useMachineSearchStore from "../../store/useMachineSearchStore";
import useThemeStore from "../../store/useThemeStore"; // Import theme store

const statuses = ["Active", "Inactive", "Under Maintenance"];

const SearchFilter = () => {
  const { searchTerm, selectedStatuses, setSearchTerm, setSelectedStatuses } =
    useMachineSearchStore();
  const { theme } = useThemeStore(); // Access the current theme from the store

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setSelectedStatuses(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[5px] bg-white p-[5px]">
      {/* Search Input */}
      <TextField
        fullWidth
        label="Search Machine"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
        sx={{
          backgroundColor: theme === "dark" ? "#333" : "white",
          borderRadius: "5px",
        }}
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          multiple
          value={selectedStatuses}
          onChange={handleStatusChange}
          sx={{
            backgroundColor: theme === "dark" ? "#333" : "white",
            borderRadius: "5px",
            fill: "none",
          }}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchFilter;
