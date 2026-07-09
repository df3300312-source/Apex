import API from "./api";

// @desc    Log in user and store token
export const login = async ({ email, password }) => {
  const { data } = await API.post("/auth/login", { email, password });

  // data contains { token, user }
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// @desc    Register new user and store token
export const register = async ({ name, email, password, referral }) => {
  const { data } = await API.post("/auth/register", {
    name,
    email,
    password,
    referral,
  });

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// @desc    Clear server-side cookie and local storage
export const logout = async () => {
  try {
    await API.post("/auth/logout");
  } finally {
    // Always clear local storage even if the network call fails
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

// @desc    Fetch current user profile data
export const getProfile = async () => {
  const { data } = await API.get("/auth/profile");
  return data; // This will return the user object
};
