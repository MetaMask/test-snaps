import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { Result, Snap } from '../../components';
import { useInvokeMutation } from '../../api';
import { getSnapId } from '../../utils/id';

const CRONJOB_SNAP_ID = 'npm:@metamask/test-snap-cronjob';
const CRONJOB_SNAP_PORT = 8010;

export const Cronjob: FunctionComponent = () => {
  const [invokeSnap, { isLoading, data, error }] = useInvokeMutation();

  const handleFireCronjob = () => {
    invokeSnap({
      snapId: getSnapId(CRONJOB_SNAP_ID, CRONJOB_SNAP_PORT),
      method: 'fireCronjob',
    });
  };

  const handleFireDialog = () => {
    invokeSnap({
      snapId: getSnapId(CRONJOB_SNAP_ID, CRONJOB_SNAP_PORT),
      method: 'fireDialog',
    });
  };

  return (
    <Snap
      name="Cronjob Snap"
      snapId={CRONJOB_SNAP_ID}
      port={CRONJOB_SNAP_PORT}
      testId="CronjobSnap"
    >
      <Button
        variant="primary"
        id="fireCronjob"
        className="mb-3"
        disabled={isLoading}
        onClick={handleFireCronjob}
      >
        Fire Cronjob
      </Button>
      <Button
        variant="secondary"
        id="fireDialog"
        className="mb-3"
        disabled={isLoading}
        onClick={handleFireDialog}
      >
        Test Dialog
      </Button>
      <Result>
        <span id="errorResult">
          {JSON.stringify(data, null, 2)}
          {JSON.stringify(error, null, 2)}
        </span>
      </Result>
    </Snap>
  );
};
