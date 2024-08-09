import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TAX_NUMBER_REGEXP_VALIDATOR } from '@/types/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  taxNumber: z
    .string({ message: 'O CPF/CNPJ é obrigatório' })
    .regex(TAX_NUMBER_REGEXP_VALIDATOR, {
      message: 'O CPF ou CNPJ deve conter 11 ou 14 dígitos',
    })
    .max(14, 'O CPF ou CNPJ deve conter 11 ou 14 dígitos'),
  password: z.string({ message: 'A senha é obrigatória' }),
});

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  function formSubmit(values: z.infer<typeof loginSchema>) {
    console.info(values);
  }

  return (
    <main className="grid h-screen grid-cols-2">
      <div className="grid place-items-center">
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="max-w-lg space-y-4 rounded border bg-card p-4"
        >
          <header>
            <h1 className="text-xl font-semibold">Login</h1>
            <p className="text-sm text-muted-foreground">
              Preencha os campos com suas informações para entrar na sua conta.
            </p>
          </header>
          <div>
            <Label htmlFor="taxNumber">CPF/CNPJ</Label>
            <Input {...register('taxNumber')} id="taxNumber" placeholder="12345678900" required />
            {errors.taxNumber?.message ? (
              <p className="mt-1 text-xs text-red-500">{errors.taxNumber.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              {...register('password')}
              id="password"
              type="password"
              placeholder="123456"
              required
            />
            {errors.password?.message ? (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            ) : null}
          </div>
          <Button type="submit" className="w-full">
            Criar Conta
          </Button>
        </form>
      </div>
      <div className="bg-primary" />
    </main>
  );
};

export default SigninPage;
