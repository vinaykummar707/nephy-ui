// components/ProtectedRoute.tsx
import useUserStore from '@/store/useUserStore';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const LoggedInRedirectPage: React.FC<ProtectedRouteProps> = ({ children }) => {
	const user = useUserStore((state) => state.user);

	// If the user is not logged in, redirect to the login page
	if (user) {
		return <Navigate to="/home" />;
	}

	// If the user is logged in, render the children components
	return <>{children}</>;
};

export default LoggedInRedirectPage;
 