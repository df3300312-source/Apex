// Mock user storage
let users = JSON.parse(localStorage.getItem("mockUsers")) || [];

export const login = async ({ email, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const token = "mock-jwt-token-" + Date.now();
  // Store user info in localStorage for profile retrieval
  localStorage.setItem(
    "mockUser",
    JSON.stringify({ id: user.id, name: user.name, email: user.email }),
  );
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
};

export const register = async ({ name, email, password, referral }) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const existing = users.find((u) => u.email === email);
  if (existing) {
    throw new Error("Email already registered");
  }
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    referral: referral || null,
    balance: 0,
  };
  users.push(newUser);
  localStorage.setItem("mockUsers", JSON.stringify(users));

  const token = "mock-jwt-token-" + Date.now();
  // Store new user info
  localStorage.setItem(
    "mockUser",
    JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }),
  );
  return {
    token,
    user: { id: newUser.id, name, email },
  };
};

export const getProfile = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  // Retrieve stored user from localStorage
  const storedUser = localStorage.getItem("mockUser");
  if (!storedUser) throw new Error("User not found");

  const user = JSON.parse(storedUser);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    balance: 1250.75, // you can later fetch real balance from your backend
  };
};
