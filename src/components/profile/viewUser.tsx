import AuthenticatedLayout from "@/pages/authenticatedPages/layout";
import ProfilePageBody from "@/pages/authenticatedPages/profilePageBody";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";

const ViewUser = ({ id }: { id: string }) => {
  const [location] = useLocation();
  return (
    <AuthenticatedLayout>
      <Helmet>
        {location.startsWith("/members") ? (
          <title>Profile</title>
        ) : (
          <title>My Profile</title>
        )}
      </Helmet>
      <div className="w-full">
        <ProfilePageBody userId={id} />
      </div>
    </AuthenticatedLayout>
  );
};

export default ViewUser;
