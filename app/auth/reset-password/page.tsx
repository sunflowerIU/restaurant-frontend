import ResetPasswordForm from "@/components/ResetPasswordForm";

async function verifyToken(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/token-verifier?token=${token}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.message || "Invalid or expired token",
    };
  }

  return {
    success: true,
    message: data.message || "Token is valid",
  };
}

type PageProps = {
  searchParams: Promise<{
    token: string;
  }>;
};

export default async function ForgotPasswordPage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) {
    throw new Error("Token not found");
  }

  const response = await verifyToken(token);

  if (!response.success) {
    throw new Error(response.message || "Invalid or Expired token");
  }

  return <ResetPasswordForm token={token} />;
}
