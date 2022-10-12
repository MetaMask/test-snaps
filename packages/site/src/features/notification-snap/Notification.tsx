import { FunctionComponent } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Snap } from '../../components';
import { useInvokeMutation } from '../../api';
import { getSnapId } from '../../utils/id';

const NOTIFICATION_SNAP_ID = 'npm:@metamask/test-snap-notification';
const NOTIFICATION_SNAP_PORT = 8005;

export const Notification: FunctionComponent = () => {
  const [invokeSnap, { isLoading }] = useInvokeMutation();

  const handleClick = (method: string) => () => {
    invokeSnap({
      snapId: getSnapId(NOTIFICATION_SNAP_ID, NOTIFICATION_SNAP_PORT),
      method,
    });
  };

  return (
    <Snap
      name="Notification Snap"
      snapId={NOTIFICATION_SNAP_ID}
      port={NOTIFICATION_SNAP_PORT}
      testId="notification-snap"
    >
      <ButtonGroup>
        <Button
          variant="primary"
          data-testid="in-app-notification"
          disabled={isLoading}
          onClick={handleClick('inApp')}
        >
          Send In-App Notification
        </Button>
        <Button
          variant="secondary"
          data-testid="native-notification"
          disabled={isLoading}
          onClick={handleClick('native')}
        >
          Send Native Notification
        </Button>
      </ButtonGroup>
    </Snap>
  );
};
