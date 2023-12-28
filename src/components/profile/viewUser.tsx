import AuthenticatedLayout from "@/pages/authenticatedPages/layout";
import ProfilePageBody from "@/pages/authenticatedPages/profilePageBody";
const ViewUser = ({ id }: { id: string }) => {
  return (
    <AuthenticatedLayout>
      <div className="w-full">
        <ProfilePageBody userId={id} />
      </div>
    </AuthenticatedLayout>
  );
};

export default ViewUser;
