import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { Result, Snap } from '../../components';
import { useInvokeMutation } from '../../api';
import { getSnapId } from '../../utils';

const INSIGHTS_SNAP_ID = 'npm:@metamask/test-snap-insights';
const INSIGHTS_SNAP_PORT = 8008;

export const Insights: FunctionComponent = () => {
  const [invokeSnap, { isLoading, data, error }] = useInvokeMutation();

  const handleSubmit = () => {
    invokeSnap({
      snapId: getSnapId(INSIGHTS_SNAP_ID, INSIGHTS_SNAP_PORT),
      method: 'getInsights',
    });
  };

  const sendIt = async () => {
    try {
      const [from] = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];

      if (!from) {
        throw new Error('Failed to get accounts.');
      }

      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from,
            to: '0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5',
            value: '0x0',
            data: '0x1',
          },
        ],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Snap
      name="Insights Snap"
      snapId={INSIGHTS_SNAP_ID}
      port={INSIGHTS_SNAP_PORT}
      testId="InsightsSnap"
    >
      <Button
        variant="primary"
        id="sendInsightsError"
        className="mb-3"
        hidden={true}
        disabled={true}
        onClick={handleSubmit}
      >
        This button is intentionally hidden
      </Button>
      <Button
        variant="primary"
        id="sendInsights"
        className="mb-3"
        disabled={isLoading}
        onClick={sendIt}
      >
        Send Transaction
      </Button>
      <Result>
        <span id="insightsResult">
          {JSON.stringify(data, null, 2)}
          {JSON.stringify(error, null, 2)}
        </span>
      </Result>
    </Snap>
  );
};
