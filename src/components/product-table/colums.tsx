import { Product } from '@/types/Product';
import { ColumnDef } from '@tanstack/react-table';

import TableActions from './table-actions';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return <p className="line-clamp-1">{row.getValue('description')}</p>;
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;
      return <TableActions product={product} />;
    },
  },
];
