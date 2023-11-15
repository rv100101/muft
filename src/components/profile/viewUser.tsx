import AuthenticatedLayout from "@/pages/authenticatedPages/layout";
import ProfilePageBody from "@/pages/authenticatedPages/profilePageBody";

const ViewUser = ({ id }: { id: string }) => {

  return (
    <AuthenticatedLayout>
      <ProfilePageBody userId={id} />
    </AuthenticatedLayout>
  );
};

export default ViewUser;
