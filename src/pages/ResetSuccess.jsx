import { CheckCircle } from "lucide-react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function ResetSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">
          Password Reset Successful
        </h2>
        <p className="text-gray-600 mb-6">
          You can now log in with your new password.
        </p>
        <Button onClick={() => navigate("/")}>
          Go to Login
        </Button>
      </div>
    </div>
  );
}
