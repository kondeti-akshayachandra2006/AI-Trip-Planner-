import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    navigate('/create-profile');
  };

  return (
    <div className="min-h-screen w-full bg-background p-6 flex flex-col">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-muted-foreground">
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Verify Code</h1>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="flex gap-3 mb-6 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-14 text-center text-xl font-bold bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
          ))}
        </div>

        <Button variant="gradient" size="lg" className="w-full mb-4" onClick={handleVerify}>
          Verify
        </Button>

        <button className="w-full text-center text-muted-foreground">
          Didn't receive code? <span className="text-primary font-medium">Resend</span>
        </button>
      </div>
    </div>
  );
}
