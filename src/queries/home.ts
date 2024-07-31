import { MemberData } from "@/types/home";
import axiosQuery from "./axios";
import {
  isMobile,
  isTablet,
  osName,
  browserName,
  isDesktop,
} from "react-device-detect";
import axios from "axios";

export interface HomePosts {
  HomePage: MemberData[];
  MyProfile: {
    blocked: boolean;
  };
}

const getDeviceInfo = async () => {
  // Determine device type using react-device-detect
  let deviceType = "Desktop";
  if (isMobile) deviceType = "Mobile";
  if (isTablet) deviceType = "Tablet";
  if (isDesktop) deviceType = "Desktop";

  // Get screen resolution
  const screenResolution = `${window.screen.width}x${window.screen.height}`;

  // Get language
  const language = navigator.language;

  // Get timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get IP address (using a public API)
  let ipAddress = "";
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    ipAddress = response.data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }

  // Placeholder values for data that cannot be obtained directly
  const osVersion = ""; // Not directly accessible
  const deviceModel = ""; // Not directly accessible
  const macAddress = ""; // Not accessible due to privacy concerns
  const orientation = window.screen.orientation?.type || ""; // Using the screen orientation API
  const batteryStatus = "";
  const networkType = ""; // Using the Network Information API
  const carrier = ""; // Not accessible via web APIs
  const biometricsSupport = ""; // Not directly accessible, check WebAuthn support

  // Return device information object
  return {
    device_type: deviceType,
    operating_system: osName,
    os_version: osVersion,
    device_model: deviceModel,
    mac_address: macAddress,
    screen_resolution: screenResolution,
    orientation: orientation,
    battery_status: batteryStatus,
    network_type: networkType,
    browser_version: browserName,
    ip_address: ipAddress,
    language: language,
    timezone: timezone,
    carrier: carrier,
    biometrics_support: biometricsSupport,
  };
};

const getMembersAndIsBlocked: (
  memberId: number,
  lang: string,
  pageNumber: number
) => Promise<HomePosts | null> = async (
  memberId: number,
  lang: string,
  pageNumber: number
) => {
  try {
    const device = await getDeviceInfo();
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId.toString());
    formData.append("lang", lang);
    formData.append("device", JSON.stringify(device));
    formData.append("page_number", pageNumber.toString());
    const res = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/home_pagination_july.php",
      formData
    );

    const memberData: HomePosts = res.data;
    return memberData;
  } catch (error) {
    return null;
  }
};

const getMembers: (
  memberId: number,
  lang: string,
  pageNumber: number
) => Promise<MemberData[] | null> = async (
  memberId: number,
  lang: string,
  pageNumber: number
) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId.toString());
    formData.append("lang", lang);
    formData.append("page_number", pageNumber.toString());
    const res = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/home_pagination.php",
      formData
    );

    const memberData: MemberData[] = res.data;
    return memberData;
  } catch (error) {
    return null;
  }
};

const getMemberLikes = async (memberId: number, lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId.toString());
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/likes.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getMemberFavorites = async (memberId: number, lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId.toString());
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/favorites.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const membersQuery = {
  getMembers,
  getMemberLikes,
  getMemberFavorites,
  getMembersAndIsBlocked,
};

export default membersQuery;
