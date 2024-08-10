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
    header: 'Nome',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => {
      return <p className="line-clamp-1">{row.getValue('description')}</p>;
    },
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ row }) =>
      Number(row.getValue('price')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
  {
    accessorKey: 'stock',
    header: 'Estoque',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;
      return <TableActions product={product} />;
    },
  },
];
