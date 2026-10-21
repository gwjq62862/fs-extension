import { useNotificationStore } from "../stores/notiStore";

const Notification = () => {
  const noti = useNotificationStore((state) => state.notification)

  if (!noti || noti.message === null) {
    return null;
  }

  const className = noti.type === 'error' ? 'error' : 'success';

  return <div className={className}>{noti.message}</div>;
};

export default Notification;
