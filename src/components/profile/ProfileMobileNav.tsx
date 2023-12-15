import TopBar2 from "../topBar2";

const ProfileMobileNav = () => {
  return (
    <div className="lg:hidden">
      <TopBar2>
        <div className="flex flex-row w-full justify-between lg:p-5 lg:border-l lg:border-r">
          <p className="uppercase font-semibold">Profile</p>
        </div>
      </TopBar2>
    </div>
  );
};

export default ProfileMobileNav;
