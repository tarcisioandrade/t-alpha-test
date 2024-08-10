import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUserAsync } from '@/services/session.service';
import { User, userSchema } from '@/types/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: User) => await createUserAsync(values),
    onSuccess: () => navigate('/signin'),
  });

  async function formSubmit(values: User) {
    await mutateAsync(values);
  }

  return (
    <main className="grid h-screen grid-cols-1 lg:grid-cols-2">
      <div className="grid place-items-center p-4">
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="max-w-lg space-y-4 rounded border bg-card p-4"
        >
          <header>
            <h1 className="text-xl font-semibold">Cadastre-se</h1>
            <p className="text-sm text-muted-foreground">
              Preencha os campos com suas informações para criar sua conta.
            </p>
          </header>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input {...register('name')} id="name" placeholder="João da Silva" required />
            {errors.name?.message ? (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('mail')}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            {errors.mail?.message ? (
              <p className="mt-1 text-xs text-red-500">{errors.mail.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="taxNumber">CPF/CNPJ</Label>
            <Input {...register('taxNumber')} id="taxNumber" placeholder="12345678900" required />
            {errors.taxNumber?.message ? (
              <p className="mt-1 text-xs text-red-500">{errors.taxNumber.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="phone">Celular</Label>
            <Input
              {...register('phone')}
              id="phone"
              type="tel"
              placeholder="11999999999"
              required
            />
            {errors.phone?.message ? (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
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
          <Button type="submit" className="w-full" disabled={isPending} aria-disabled={isPending}>
            Criar Conta
          </Button>
          <p className="text-sm">
            Já possui uma conta?{' '}
            <Button className="p-0" variant="link" asChild>
              <a href="/signin">Acesse</a>
            </Button>
          </p>
        </form>
      </div>
      <div className="hidden bg-primary lg:block" />
    </main>
  );
};

export default SignupPage;
