import { FunctionComponent } from 'react';
import { Snap } from '../../components';
import { SignMessage } from './SignMessage';

export const GETENTROPY_SNAP_ID = 'npm:@metamask/test-snap-ethersjs';
export const GETENTROPY_PORT = 8014;

export const Ethersjs: FunctionComponent = () => {
  return (
    <Snap
      name="ethers.js test Snap"
      snapId={GETENTROPY_SNAP_ID}
      port={GETENTROPY_PORT}
      testId="ethersjsSnap"
    >
      <SignMessage />
    </Snap>
  );
};
