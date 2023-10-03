import { create } from "zustand";

type MobileMessagingView = "CHAT-MESSAGES" | "CHAT-LIST";

interface ViewState {
  view: MobileMessagingView;
  toggle: () => void;
}
const useMobileMessagingViewStore = create<ViewState>()((set) => ({
  view: "CHAT-LIST",
  toggle: () =>
    set((state) => {
      if (state.view == "CHAT-LIST") {
        return { view: "CHAT-MESSAGES" };
      } else {
        return { view: "CHAT-LIST" };
      }
    }),
}));

export default useMobileMessagingViewStore;
