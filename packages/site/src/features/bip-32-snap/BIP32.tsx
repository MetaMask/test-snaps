import { FunctionComponent } from 'react';
import { Snap } from '../../components';
import { SignMessage } from './SignMessage';
import { PublicKey } from './PublicKey';

export const BIP_32_SNAP_ID = 'npm:@metamask/test-snap-bip-32';
export const BIP_32_PORT = 8006;

export const BIP32: FunctionComponent = () => {
  return (
    <Snap
      name="BIP-32 Snap"
      snapId={BIP_32_SNAP_ID}
      port={BIP_32_PORT}
      testId="Bip32"
    >
      <PublicKey />
      <SignMessage curve="secp256k1" />
      <SignMessage curve="ed25519" />
    </Snap>
  );
};
