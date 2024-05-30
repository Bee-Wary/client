import { getAllNotifications } from '@/services/server/notifications/queries';

import { NotificationForm } from '@/components/notification/notificationForm';

const NotificationPage = async ({ params, searchParams }: { params: { inspectionID?: string }; searchParams: { beehiveRefID?: string } }) => {
  const allNotifications: NotificationList[] = (await getAllNotifications()).documents;

  return <NotificationForm NotificationList={allNotifications} />;
};

export default NotificationPage;
