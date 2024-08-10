import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signinUserAsync } from '@/services/session.service';
import { loginSchema, UserLogin } from '@/types/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: UserLogin) => await signinUserAsync(values),
    onSuccess: (res) => {
      Cookies.set('access_token', res.data?.token);
      navigate('/');
    },
  });

  async function formSubmit(values: UserLogin) {
    await mutateAsync(values);
  }

  return (
    <main className="grid h-screen lg:grid-cols-2">
      <div className="grid place-items-center p-4">
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
          <Button type="submit" className="w-full" disabled={isPending} aria-disabled={isPending}>
            Login
          </Button>
          <p className="text-sm">
            Não possui uma conta?{' '}
            <Button className="p-0" variant="link" asChild>
              <a href="/signup">Cadastre-se</a>
            </Button>
          </p>
        </form>
      </div>
      <div className="hidden bg-primary lg:block" />
    </main>
  );
};

export default SigninPage;
