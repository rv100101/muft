import { Switch } from "@/components/ui/switch";
import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";

const DeactivateAccountContent = () => {
  const { user } = useUserStore();
  console.log("TCL: DeactivateAccountContent -> user", user);

  const deactivateAccount = async () => {
    const res = await axiosQuery.post("/DeactivateAccount", {
      member: user!.member_id,
    });
    console.log("TCL: deactivateAccount -> res", res);
  };
  return (
    <div className="flex flex-col border w-2/5 justify-center text-[#727272] space-y-2 p-5">
      <p className="font-semibold pb-1">Deactivate Account</p>
      <p className="font-medium">Deactivate</p>
      <div className="flex flex-row w-full justify-between">
        <p>Deactivate my Account</p>
        <Switch id="airplane-mode" onClick={() => deactivateAccount()} />
        {/* <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
      </div>
      <p className="pt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </p>
    </div>
  );
};

export default DeactivateAccountContent;
