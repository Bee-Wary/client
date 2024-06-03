'use client';
import { XCircle } from '@phosphor-icons/react/dist/ssr';
import style from '@/styles/notifications/notifications.module.scss';

type Props = {
  NotificationList: NotificationList[];
};
export const NotificationForm = (props: Props) => {
  return (
    <div className={style.NotifcationList}>
      {props.NotificationList.map((notification) => (
        <div key={notification._id} className={style.NotificationItem}>
          <div className={style.NotificationCard}>
            <div className={style.NotificationCardTop}>
              <h1 className={style.NotificationTitle}>{notification.Name}</h1>
              <XCircle size={20} />
            </div>
            <p className={style.NotificationMessage}>{notification.Message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
