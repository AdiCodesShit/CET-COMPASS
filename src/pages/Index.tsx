import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to the College Finder page as the default landing page
  return <Navigate to="/college-finder" replace />;
};

export default Index;