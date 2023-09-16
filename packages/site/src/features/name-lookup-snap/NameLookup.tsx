import { FunctionComponent } from 'react';
import { Snap } from '../../components';

const NAME_LOOKUP_SNAP_ID = 'npm:@metamask/test-snap-name-lookup';
const NAME_LOOKUP_SNAP_PORT = 8015;

export const NameLookup: FunctionComponent = () => {
  return (
    <Snap
      name="Name Lookup Snap"
      snapId={NAME_LOOKUP_SNAP_ID}
      port={NAME_LOOKUP_SNAP_PORT}
      testId="NameLookupSnap"
    ></Snap>
  );
};
