import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { Result, Snap } from '../../components';
import { useInvokeSnapMutation } from '../../api';
import { getSnapId } from '../../utils/id';

const ERROR_SNAP_ID = 'npm:@metamask/test-snap-error';
const ERROR_SNAP_PORT = 8002;

export const ErrorSnap: FunctionComponent = () => {
  const [invokeSnap, { isLoading, data, error }] = useInvokeSnapMutation();

  const handleSubmit = () => {
    invokeSnap({
      snapId: getSnapId(ERROR_SNAP_ID, ERROR_SNAP_PORT),
      method: 'test',
    });
  };

  return (
    <Snap
      name="Error Snap"
      snapId={ERROR_SNAP_ID}
      port={ERROR_SNAP_PORT}
      testId="error-snap"
    >
      <Button
        variant="primary"
        className="mb-3"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        Send Test to Error Snap
      </Button>
      <Result>
        <span data-testid="error-result">
          {JSON.stringify(data, null, 2)}
          {JSON.stringify(error, null, 2)}
        </span>
      </Result>
    </Snap>
  );
};
