import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { logout } from '@/services/session.service';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  function triggerLogout() {
    logout();
    navigate('/signin');
  }

  return (
    <header className="border-b">
      <div className="container flex h-12  items-center justify-between">
        <span>T-Alpha-Test-Resolution</span>
        <Button variant="link" className="space-x-1" onClick={triggerLogout}>
          <span>Sair</span>
          <LogOut size={12} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
