import { apiFetch } from "./authorization/api";
import { OrderSchema, PaymentInitiateSchema } from "./types/order";

///reset password form submission
export async function submitForm(prevState: any, formData: FormData) {
  const token = formData.get("token")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!token) {
    return { success: false, message: "Token not found." };
  }
  if (!password || !confirmPassword) {
    return { success: false, message: "Please fill up the details." };
  }
  if (password.length < 8) {
    return { success: false, message: "Password must be atleast 8 character." };
  }
  if (password.trim() !== confirmPassword.trim()) {
    return { success: false, message: "Please Passwords do not match" };
  }

  //   console.log(token, password, confirmPassword);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message };
    }
    return { success: true, message: "Password updated" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update your password",
    };
  }
}

//checkout
export async function proceedCheckout(prevState: any, orderData: OrderSchema) {
  const idempotencyKey = crypto.randomUUID();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/create`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(orderData),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create your order",
    };
  }
}

//payment initiate
export async function initiatePayment(
  prevState: any,
  paymentData: PaymentInitiateSchema,
) {
  const idempotencyKey = crypto.randomUUID();
  console.log(paymentData);
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/initiate`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(paymentData),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message };
    }

    return { data };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to initiate payment",
    };
  }
}
