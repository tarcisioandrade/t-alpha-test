import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductAsync } from "@/services/product/delete.service";
import { useTableContext } from "./table-context";
import ProductSheet from "../product-update-sheet";
import { useState } from "react";
import { productKeys } from "@/lib/query-key-factory";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  product: Product;
};

const TableActions = ({ product }: Props) => {
  const queryClient = useQueryClient();
  const [sheetOpen, setSheetOpen] = useState(false);

  const { setLoading } = useTableContext();

  const { mutateAsync: mutateDelAsync } = useMutation({
    mutationFn: async (id: number) => await deleteProductAsync(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  async function deleteFn() {
    setLoading(true);
    await mutateDelAsync(product.id);
  }

  return (
    <ProductSheet product={product} open={sheetOpen} setSheetOpen={setSheetOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={deleteFn}>Deletar</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSheetOpen(true)}>Atualizar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ProductSheet>
  );
};

export default TableActions;
