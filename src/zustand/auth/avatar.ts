import { create } from "zustand";

interface UserAvatar {
  gallery_uuid: string | null;
  setAvatar: (val: string) => void;
}
export const useUserAvatar = create<UserAvatar>((set) => ({
  gallery_uuid: null,
  setAvatar: (val) => set(() => ({ gallery_uuid: val })),
}));
