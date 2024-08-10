import { Input } from '@/components/ui/input';
import Spinner from '../ui/spinner';
import { useTableContext } from './table-context';
import ProductCreateSheet from '../product-create-sheet';
import { TablePagination } from './table-pagination';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  PaginationState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isError: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isError,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading } = useTableContext();

  const pageIndex = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('per_page')) || 10;
  const globalFilter = searchParams.get('q') || '';

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex - 1,
    pageSize: pageSize,
  });
  const [searchValue, setSearchValue] = useState(globalFilter);
  const searchValueDebounced = useDebounce(searchValue);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, globalFilter, pagination },
    onGlobalFilterChange: (value) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (value) {
          newParams.set('q', value);
        } else {
          newParams.delete('q');
        }
        return newParams;
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
  });

  useEffect(
    function defaultQueryState() {
      setSearchParams((params) => {
        params.set('page', String(pagination.pageIndex + 1));
        params.set('per_page', String(pagination.pageSize));
        return params;
      });
    },
    [pagination.pageIndex, pagination.pageSize],
  );

  useEffect(
    function handleSearchValue() {
      table.setGlobalFilter(searchValueDebounced);
    },
    [searchValueDebounced],
  );

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between py-4">
        <div>
          <Input
            placeholder="Filtrar por nomes..."
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
            className="max-w-sm"
          />
        </div>
        <ProductCreateSheet />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="relative min-h-[400px]">
            {loading ? (
              <tr className="absolute inset-0 grid place-items-center bg-white/30 backdrop-blur-sm  ">
                <td>
                  <Spinner />
                </td>
              </tr>
            ) : null}
            {isError ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Falha ao obter os dados
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  );
}
