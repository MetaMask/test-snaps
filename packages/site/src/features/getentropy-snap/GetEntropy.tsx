import { FunctionComponent } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Result, Snap } from '../../components';
import { useInvokeMutation } from '../../api';
import { getSnapId } from '../../utils/id';
// import { SignMessage } from './SignMessage';

export const GETENTROPY_SNAP_ID = 'npm:@metamask/test-snap-getentropy';
export const GETENTROPY_PORT = 8011;

export const GetEntropy: FunctionComponent = () => {
  const [invokeSnap, { isLoading, data }] = useInvokeMutation();

  const handleClick = (method: string) => () => {
    invokeSnap({
      snapId: getSnapId(GETENTROPY_SNAP_ID, GETENTROPY_PORT),
      method,
    });
  };

  return (
    <Snap
      name="getEntropy Snap"
      snapId={GETENTROPY_SNAP_ID}
      port={GETENTROPY_PORT}
      testId="GetEntropySnap"
    >
      <ButtonGroup className="mb-3">
        <Button
          id="sendGetEntropyTest"
          data-testid="send-test"
          onClick={handleClick('getEntropyOutput')}
          disabled={isLoading}
        >
          Send Test
        </Button>
      </ButtonGroup>
      <Result className="mb-3">
        <span id="getEntropyResult" data-testid="test-result">
          {JSON.stringify(data, null, 2)}
        </span>
      </Result>
    </Snap>
  );
};
