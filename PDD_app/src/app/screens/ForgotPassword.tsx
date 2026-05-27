import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    navigate('/otp');
  };

  return (
    <div className="min-h-screen w-full bg-background p-6 flex flex-col">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-muted-foreground">
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email and we'll send you a code to reset your password
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-5 h-5" />}
          />
        </div>

        <Button variant="gradient" size="lg" className="w-full" onClick={handleSendCode}>
          Send Reset Code
        </Button>
      </div>
    </div>
  );
}
