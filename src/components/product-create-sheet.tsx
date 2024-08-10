import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/types/Product';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { createProductAsync } from '@/services/product/create.service';
import { Textarea } from './ui/textarea';
import { productKeys } from '@/lib/query-key-factory';

const createProductSchema = productSchema.omit({ id: true });

const ProductCreateSheet = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
  });
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (product: z.infer<typeof createProductSchema>) =>
      await createProductAsync(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      setSheetOpen(false);
      reset();
    },
  });

  async function createFn(input: z.infer<typeof createProductSchema>) {
    await mutateAsync(input);
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button className="space-x-1">
          <Plus /> <span className="hidden sm:inline">Adicionar Produto</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Produto</SheetTitle>
          <SheetDescription>Preencha os campos para criar um novo produto.</SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(createFn)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" className="col-span-3" {...register('name')} />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              rows={10}
              className="col-span-3"
              {...register('description')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input id="price" className="col-span-3" {...register('price')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Estoque
            </Label>
            <Input id="stock" className="col-span-3" min={0} {...register('stock')} />
          </div>
          <SheetFooter>
            <Button type="submit" disabled={isPending} aria-disabled={isPending}>
              Criar Produto
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ProductCreateSheet;
