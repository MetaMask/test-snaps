import { FunctionComponent } from 'react';
import { useGetSnapsQuery } from '../../api';
import { Result, Snap } from '../../components';

export const Snaps: FunctionComponent = () => {
  const { data: installedSnaps } = useGetSnapsQuery(undefined, {
    pollingInterval: 1000,
  });

  return (
    <Snap name="Installed Snaps" testId="installed-snaps" hideConnect={true}>
      <Result>
        <span data-testid="installed-snaps-result">
          {installedSnaps
            ? Object.keys(installedSnaps).join(', ')
            : 'No Snaps installed.'}
        </span>
      </Result>
    </Snap>
  );
};
