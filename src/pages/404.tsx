import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <main className="h-screen bg-primary text-white">
      <div className="size-1" />
      <div className="mt-28 space-y-2 text-center">
        <strong className="text-6xl">404</strong>
        <p>Página não Encontrada</p>
        <Button variant="link" asChild>
          <a className="text-white" href="/">
            Página Inicial
          </a>
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
