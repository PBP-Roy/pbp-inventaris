import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_FilterRangeSlider,
  MRT_FilterTextField,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputBarangModal from './InputBarangModal';
import { MRT_CustomToggleFiltersButton } from './MRT_CustomToggleFiltersButton';

const DataTable = ({ data, type }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [editedUsers, setEditedUsers] = useState({});  
  // Use the state from context
  const [users, setUsers] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  let columns = [
    {
      accessorKey: 'id_brg',
      header: 'Id',
      size: 80,
    },
    {
      accessorKey: 'nama_brg',
      header: 'Product Name',
    },
    {
      // TODO: Calculate total stock when passing data, or calculate in backend
      accessorKey: 'stok_total',
      header: 'Quantity',
    },
    {
      accessorKey: 'stok_layak',
      header: 'Usable',
      
    },
    {
      accessorKey: 'stok_tidak_layak',
      header: 'Unusable',
    },
    {
      accessorKey: 'besaran',
      header: 'Unit',
    },
    {
      accessorKey: 'kategori',
      header: 'Category', 
    },
  ];

  switch (type) {
    case 'all':
      columns = [
        ...columns,
        {
          // TODO: Sesuaikan accessorKey dengan nama kolom di data
          accessorKey: 'updated_at',
          header: 'Last Update',
        }
      ];
      break;
    case 'in':
      columns = [
        ...columns,
        {
          // TODO: Sesuaikan accessorKey dengan nama kolom di data
          accessorKey: 'updated_at',
          header: 'Date In',
        }
      ]
      break;
    case 'out':
      columns = [
        ...columns,
        {
          // TODO: Sesuaikan accessorKey dengan nama kolom di data
          accessorKey: 'updated_at',
          header: 'Date Out',
        }
      ]
      break;
    case 'broken':
      columns = [
        {
          accessorKey: 'id_brg',
          header: 'Id',
          size: 80,
        },
        {
          accessorKey: 'nama_brg',
          header: 'Product Name',
        },
        {
          // TODO: Calculate broken products
          accessorKey: 'broken',
          header: 'Quantity'
        },
        {
          accessorKey: 'kategori',
          header: 'Category',
        },
        {
          // TODO: When is the product broken
          accessorKey: 'date',
          header: 'Date Broken'
        }
      ]
      break;
    default:
      break;
  }

  // TODO: Add Conditional Rendering based on type
  const table = useMaterialReactTable({
    columns,
    data: users,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableCellActions: true,
    enableClickToCopy: 'context-menu',
    enableColumnPinning: true,
    enableEditing: true,
    enableRowActions: true,
    getRowId: (row) => row.id,
    muiTableContainerProps: { sx: { minHeight: '500px' } },
    onCreatingRowCancel: () => setValidationErrors({}),
    // onCreatingRowSave: handleCreateUser,
    muiSearchTextFieldProps: {
      type: 'string'
    },
    muiFilterTextFieldProps: {
      type: 'string'
    },
    initialState: {
      columnPinning: {
        right: ['mrt-row-actions'],
      },
      showGlobalFilter: true,
    },
    muiTablePaperProps: {
      elevation: 0,
    },
    renderCreateRowDialogContent: ({ table, row }) => (
      <>
        {console.log(row)}
        <InputBarangModal onCancel={() => {table.setCreatingRow(false)}} onConfirm={() => {table.setCreatingRow(false)}} />
      </>
    ),
    renderEditRowDialogContent: ({ table, row }) => (
      <>
      {console.log(row)}
      <InputBarangModal data={row.original} onCancel={() => {table.setEditingRow(false)}} onConfirm={() => {table.setEditingRow(false)}} />
      </>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => alert(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbar: ({ table }) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
        <Typography variant='h4'>All Products</Typography>
        <MRT_GlobalFilterTextField table={table} />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
          <Button
            variant="contained"
            onClick={() => table.setCreatingRow(true)}
          >
            Add Product
          </Button>
          <MRT_CustomToggleFiltersButton table={table} />
        </div>
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default DataTable;