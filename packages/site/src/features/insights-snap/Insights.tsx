import { FunctionComponent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Snap } from '../../components';

const INSIGHTS_SNAP_ID = 'npm:@metamask/test-snap-insights';
const INSIGHTS_SNAP_PORT = 8008;

export const Insights: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendIt = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
        id="sendInsights"
        className="mb-3"
        disabled={isLoading}
        onClick={sendIt}
      >
        Send Transaction
      </Button>
    </Snap>
  );
};
