import axiosQuery from "./axios";

export type NotificationData = {
  authorized: boolean;
  ip_address: string;
  notification_category: string;
  notification_reference: null | string;
  member_id: number;
  category_description: string;
  nickname: string;
  country_name: string;
  state_name: string;
  notification_date: string;
  notification_time: string;
};

const getNotifications = async (memberId: number) => {
  try {
    const res = await axiosQuery.post("/Notifications", {
      member: memberId,
    });
    if (res.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const notificationQuery = {
  getNotifications,
};

export default notificationQuery;
