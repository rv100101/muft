import TopBar from "../topBar";

const NotificationsListHeader = () => {
  return (
    <div className="p-4">
      <TopBar>
        <div className="flex items-center justify-between w-full space-x-2">
          <p className="font-semibold">NOTIFICATION</p>
        </div>
      </TopBar>
    </div>
  );
};

export default NotificationsListHeader;
