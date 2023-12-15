import TopBar2 from "../topBar2";

const NotificationsListHeader = () => {
  return (
    <div className="lg:hidden">
      <TopBar2>
        <div className="flex items-center justify-between w-full space-x-2">
          <p className="font-semibold">NOTIFICATION</p>
        </div>
      </TopBar2>
    </div>
  );
};

export default NotificationsListHeader;
