import { FunctionComponent } from 'react';
import { Result, Snap } from '../../components';
import { useGetSnapsQuery, useGetStateQuery } from '../../api';
import { getSnapId } from '../../utils/id';
import { SendData } from './SendData';
import { ClearData } from './ClearData';

export const MANAGE_STATE_ID = 'npm:@metamask/test-snap-manage-state';
export const MANAGE_STATE_PORT = 8004;

export const MANAGE_STATE_ACTUAL_ID = getSnapId(
  MANAGE_STATE_ID,
  MANAGE_STATE_PORT,
);

export const ManageState: FunctionComponent = () => {
  const { data: snaps } = useGetSnapsQuery();
  const { data: state } = useGetStateQuery(
    { snapId: MANAGE_STATE_ACTUAL_ID },
    {
      skip: !(snaps && Object.keys(snaps).includes(MANAGE_STATE_ACTUAL_ID)),
    },
  );

  return (
    <Snap
      name="Manage State Snap"
      snapId={MANAGE_STATE_ID}
      port={MANAGE_STATE_PORT}
      testId="manage-state-snap"
    >
      <Result className="mb-3">
        <span data-testid="current-state">
          {JSON.stringify(state, null, 2)}
        </span>
      </Result>

      <SendData />
      <ClearData />
    </Snap>
  );
};
