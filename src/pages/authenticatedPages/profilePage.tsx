import AuthenticatedLayout from "./layout";
import ProfilePageBody from "./profilePageBody";

const ProfilePage = () => {
  return (
    <AuthenticatedLayout>
      <ProfilePageBody />
    </AuthenticatedLayout>
  );
};

export default ProfilePage;
