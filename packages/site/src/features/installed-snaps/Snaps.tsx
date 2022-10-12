import { FunctionComponent } from 'react';
import { useGetSnapsQuery } from '../../api';
import { Result, Snap } from '../../components';

export const Snaps: FunctionComponent = () => {
  const { data: installedSnaps } = useGetSnapsQuery();

  return (
    <Snap name="Installed Snaps" testId="installed-snaps" hideConnect={true}>
      <Result>
        <span data-testid="installed-snaps-result">
          {installedSnaps && Object.keys(installedSnaps).length > 0
            ? Object.keys(installedSnaps).join(', ')
            : 'No Snaps installed.'}
        </span>
      </Result>
    </Snap>
  );
};
