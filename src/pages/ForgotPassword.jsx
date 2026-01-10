import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import authService from "../api/authService";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  

  const submit = async () => {
    try {
      if (!email) {
        setError("Please enter your email");
        return;
      }
      else if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address");
        return;
      }
      setLoading(true);
      setError('');
      const response = await authService.requestPasswordReset(email);
      if(!response.success) {
        setLoading(false);
        setError(response.message || "Failed to request password reset");
        return;
      }
      setLoading(false);
      navigate(`/reset-password?token=${email}`);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
            {error && <Alert type="error" message={error} />}
            
            <Input
              label="Email"
              placeholder="Enter your email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button loading={loading} onClick={submit}>
              Send Otp
            </Button>
      </div>
    </div>
  );
}
