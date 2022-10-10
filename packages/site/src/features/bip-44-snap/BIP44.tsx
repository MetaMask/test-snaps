import { FunctionComponent } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Result, Snap } from '../../components';
import { useInvokeSnapMutation } from '../../api';
import { getSnapId } from '../../utils/id';
import { SignMessage } from './SignMessage';

export const BIP_44_SNAP_ID = 'npm:@metamask/test-snap-bip-44';
export const BIP_44_PORT = 8003;

export const BIP44: FunctionComponent = () => {
  const [invokeSnap, { isLoading, data }] = useInvokeSnapMutation();

  const handleClick = (method: string, coinType?: number) => () => {
    invokeSnap({
      snapId: getSnapId(BIP_44_SNAP_ID, BIP_44_PORT),
      method,
      params: {
        coinType,
      },
    });
  };

  return (
    <Snap
      name="BIP-44 Snap"
      snapId={BIP_44_SNAP_ID}
      port={BIP_44_PORT}
      testId="bip-44-snap"
    >
      <ButtonGroup className="mb-3">
        <Button
          data-testid="send-test"
          onClick={handleClick('getAccount', 1)}
          disabled={isLoading}
        >
          Send Test
        </Button>
        <Button
          variant="secondary"
          data-testid="send-invalid-test"
          onClick={handleClick('getAccount', 3)}
          disabled={isLoading}
        >
          Send Invalid
        </Button>
      </ButtonGroup>
      <Result className="mb-3">
        <span data-testid="test-result">{JSON.stringify(data, null, 2)}</span>
      </Result>

      <SignMessage />
    </Snap>
  );
};
