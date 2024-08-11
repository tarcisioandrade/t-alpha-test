import { Product, productSchema } from "@/types/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DialogProps } from "@radix-ui/react-dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAsync } from "@/services/product/update.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import { productKeys } from "@/lib/query-key-factory";

type Props = {
  product: Product;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
} & DialogProps;

const ProductSheet = ({ product, children, open, setSheetOpen, ...rest }: Props) => {
  const { register, handleSubmit } = useForm<z.input<typeof productSchema>>({
    defaultValues: {
      id: product.id,
      description: product.description,
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
    },
    resolver: zodResolver(productSchema),
  });
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (product: z.output<typeof productSchema>) =>
      await updateProductAsync(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      setSheetOpen(false);
    },
  });

  async function updateFn(input: z.input<typeof productSchema>) {
    await mutateAsync({
      id: input.id,
      name: input.name,
      description: input.description,
      price: Number(input.price),
      stock: Number(input.stock),
    });
  }

  return (
    <Sheet open={open} onOpenChange={setSheetOpen} {...rest}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Produto</SheetTitle>
          <SheetDescription>
            Faça alterações no produto aqui. Clique em salvar quando acabar.
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(updateFn)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" className="col-span-3" {...register("name")} />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              rows={10}
              id="description"
              className="col-span-3"
              {...register("description")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input id="price" className="col-span-3" {...register("price")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Estoque
            </Label>
            <Input id="stock" className="col-span-3" {...register("stock")} />
          </div>
          <SheetFooter>
            <Button type="submit" disabled={isPending} aria-disabled={isPending}>
              Salvar Mudanças
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
      {children}
    </Sheet>
  );
};

export default ProductSheet;
