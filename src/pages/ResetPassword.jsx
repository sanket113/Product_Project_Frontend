import { useState } from "react";
import { Lock, KeyRound } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import authService from "../api/authService";
import Alert from "../components/Alert";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("token"); 

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    setError("");

    if (!otp) {
      setError("OTP is required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const result = await authService.confirmPasswordReset(
      email,
      password,
      otp
    );
    setLoading(false);

    if (result.success) {
      navigate("/reset-success");
    } else {
      setError(result.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {error && (
          <Alert type="error" message={error} />
        )}

        <Input
          label="OTP"
          icon={KeyRound}
          placeholder="Enter the OTP sent to your email"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <Input
          label="New Password"
          placeholder="Enter your new password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirm Password"
          placeholder="Confirm your new password"
          type="password"
          icon={Lock}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button loading={loading} onClick={submit}>
          Reset Password
        </Button>
      </div>
    </div>
  );
}
