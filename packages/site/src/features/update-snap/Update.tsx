import { FunctionComponent } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Result, Snap } from '../../components';
import {
  useGetSnapsQuery,
  useInstallSnapMutation,
  useInvokeMutation,
} from '../../api';

const UPDATE_SNAP_ID = 'npm:@metamask/test-snap-confirm';
const UPDATE_SNAP_OLD_VERSION = '1.0.0';
const UPDATE_SNAP_NEW_VERSION = '2.0.0';

export const Update: FunctionComponent = () => {
  const [installSnap, { isLoading }] = useInstallSnapMutation();
  const [invokeSnap, { isLoading: isInvokeLoading }] = useInvokeMutation();
  const { data: snaps } = useGetSnapsQuery();

  const currentVersion = snaps?.[UPDATE_SNAP_ID]?.version;

  const handleUpdate = () => {
    installSnap({
      snapId: UPDATE_SNAP_ID,
      version: UPDATE_SNAP_NEW_VERSION,
    });
  };

  const handleTest = () => {
    invokeSnap({
      snapId: UPDATE_SNAP_ID,
      method: 'confirm',
      params: ['Hello, world!'],
    });
  };

  return (
    <Snap
      name="Update Snap"
      snapId={UPDATE_SNAP_ID}
      version={UPDATE_SNAP_OLD_VERSION}
      testId="Update"
    >
      <Result className="mb-3">
        <span id="updateSnapVersion" data-testid="update-version">
          {JSON.stringify(currentVersion, null, 2)}
        </span>
      </Result>

      <ButtonGroup>
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={handleUpdate}
          id="connectUpdateNew"
          data-testid="update-button"
        >
          Update Snap
        </Button>
        <Button
          variant="secondary"
          onClick={handleTest}
          disabled={isInvokeLoading}
        >
          Send Test
        </Button>
      </ButtonGroup>
    </Snap>
  );
};
