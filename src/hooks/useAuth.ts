import { AuthContext, AuthContextType } from '../context/auth';
import { useContext } from 'react';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}