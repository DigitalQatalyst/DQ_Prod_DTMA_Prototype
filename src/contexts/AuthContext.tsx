import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { seedUsers } from "@/mocks/data";

export type AppRole = "learner" | "instructor" | "admin";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  provider_type?: "individual" | "institution";
}

interface LocalUser extends Profile {
  password: string;
  role: AppRole;
}

interface AuthContextType {
  user: LocalUser | null;
  session: { userId: string } | null;
  profile: Profile | null;
  role: AppRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role?: AppRole,
    providerType?: "individual" | "institution"
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "mock_users";
const SESSION_KEY = "mock_session";

function loadUsers(): LocalUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (raw) return JSON.parse(raw) as LocalUser[];
  // Seed initial users (passwords are "password")
  const seeded: LocalUser[] = seedUsers.map((u) => ({
    ...u,
    avatar_url: null,
    bio: null,
    phone: null,
    password: "password",
  }));
  localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveUsers(users: LocalUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

function saveSession(userId: string | null) {
  if (!userId) {
    localStorage.removeItem(SESSION_KEY);
  } else {
    localStorage.setItem(SESSION_KEY, userId);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = loadUsers();
    setUsers(storedUsers);
    const storedSession = loadSession();
    setUserId(storedSession);
    setLoading(false);
  }, []);

  const currentUser = useMemo(
    () => users.find((u) => u.id === userId) || null,
    [users, userId]
  );

  const profile = useMemo(() => {
    if (!currentUser) return null;
    const { password, role, ...rest } = currentUser;
    return rest;
  }, [currentUser]);

  const role = currentUser?.role ?? null;

  const signIn = async (email: string, password: string) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { error: new Error("Invalid credentials") };
    }
    setUserId(found.id);
    saveSession(found.id);
    return { error: null };
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: AppRole = "learner",
    providerType?: "individual" | "institution"
  ) => {
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { error: new Error("Email already registered") };
    }
    const newUser: LocalUser = {
      id: `user-${Math.random().toString(36).slice(2, 10)}`,
      email,
      full_name: fullName,
      avatar_url: null,
      bio: null,
      phone: null,
      password,
      role,
      provider_type: providerType,
    };
    const next = [...users, newUser];
    setUsers(next);
    saveUsers(next);
    setUserId(newUser.id);
    saveSession(newUser.id);
    return { error: null };
  };

  const signOut = async () => {
    setUserId(null);
    saveSession(null);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!currentUser) return { error: new Error("No user logged in") };
    const updated: LocalUser = { ...currentUser, ...data };
    const next = users.map((u) => (u.id === currentUser.id ? updated : u));
    setUsers(next);
    saveUsers(next);
    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        session: currentUser ? { userId: currentUser.id } : null,
        profile,
        role,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
