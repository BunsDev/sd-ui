import { showNotification } from "@mantine/notifications";

export default function TriggerNotification({
  message,
  color,
  loading,
}: {
  message: string;
  color: string;
  loading: boolean;
}) {
  showNotification({
    message: message,
    color: color,
    autoClose: 5,
    loading,
  });
}
