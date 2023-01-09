import { useQuery } from "@tanstack/react-query";
import TriggerNotification from "../utils/TriggerNotification";

async function getStatus() {
  try {
    const res = await fetch("https://waifus-api.nemusona.com/api/status", {
      method: "GET",
    });
    if (res.status === 200) {
      return true;
    } else {
      throw new Error("Server Offline");
    }
  } catch (error: any) {
    throw new Error("Server Offline");
  }
}

export default function useGetStatus() {
  return useQuery(["status"], () => getStatus(), {
    refetchInterval: 60000,
    onSuccess: () => {
      TriggerNotification({
        message: "Server is active",
        color: "green",
        loading: false,
      });
    },
    onError: () => {
      TriggerNotification({
        message: "Server is down",
        color: "red",
        loading: false,
      });
    },
  });
}
