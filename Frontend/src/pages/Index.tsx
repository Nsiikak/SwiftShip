import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // This page simply redirects to the Home page
  return <Navigate to="/" replace />;
};

export default Index;
