const authService = {




  requestPasswordReset: async (email) => {
    const response = await fetch('http://localhost:8080/auth/password-reset/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, message: data.message || "Failed to request password reset" };
    }
  },

  confirmPasswordReset: async (email, newPassword, otp) => {
    const response = await fetch('http://localhost:8080/auth/password-reset/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword, otp }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, message: data.message || "Failed to confirm password reset" };
    }
  },
};

export default authService;
