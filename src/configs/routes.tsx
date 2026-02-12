import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import MainLayout from "../layouts/MainLayout";


import ProtectedRoute from "../components/ProtectedRoute";
import ItemDetailPage from "../components/ItemDetails";
import AuthLayout from "../layouts/AuthLayout";
import DashboardPage from "../pages/DashboardPage";


export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
    { index: true, element: <Navigate to="login" replace /> },
    { path: 'login', element: <AuthPage /> },
    { path: 'signup', element: <AuthPage /> },
  ]
 },
  {
    path: '/',
    element:  <ProtectedRoute><MainLayout /></ProtectedRoute>, 
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'items/:id', element: <ItemDetailPage /> }
    ],
  },
]);