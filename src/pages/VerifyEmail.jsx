import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const verified = searchParams.get("verified");
  const error = searchParams.get("error");

  useEffect(() => {
    if (verified === "true") {
      // Show success message and redirect to login after a moment
      setTimeout(() => navigate("/login?verified=true"), 3000);
    } else if (error) {
      // Show error and redirect to login after a moment
      setTimeout(() => navigate("/login?error=verification_failed"), 3000);
    } else if (token) {
      // If token exists, we don't need to do anything here – backend handles it.
      // The backend will redirect to login with ?verified=true or ?error=...
      // We can just show a loading message.
    }
  }, [navigate, verified, error, token]);

  return (
    <div className="container text-center mt-5">
      {token && <p>Verifying your email, please wait...</p>}
      {verified === "true" && (
        <p className="text-success">Email verified! Redirecting to login...</p>
      )}
      {error && (
        <p className="text-danger">
          Verification failed. Please try again or contact support.
        </p>
      )}
    </div>
  );
};

export default VerifyEmail;
