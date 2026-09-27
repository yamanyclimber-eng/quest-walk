'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

interface AuthUser {
    id: string;
    email: string;
    nickname: string | null;
}

interface AuthState {
    user: AuthUser | null;
    hasProfile: boolean;
    loading: boolean;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within Providers');
    return ctx;
}

export default function Providers({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [hasProfile, setHasProfile] = useState(false);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        try {
            const res = await fetch('/api/me', { credentials: 'same-origin' });
            const data = await res.json();
            if (data.authenticated) {
                setUser(data.user);
                setHasProfile(Boolean(data.hasProfile));
            } else {
                setUser(null);
                setHasProfile(false);
            }
        } catch {
            setUser(null);
            setHasProfile(false);
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
        setUser(null);
        setHasProfile(false);
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <AuthContext.Provider value={{ user, hasProfile, loading, refresh, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
