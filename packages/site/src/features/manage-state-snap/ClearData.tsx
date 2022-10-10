import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { Result } from '../../components';
import { useInvokeSnapMutation } from '../../api';
import { MANAGE_STATE_ACTUAL_ID } from './ManageState';

export const ClearData: FunctionComponent = () => {
  const [invokeSnap, { isLoading, data }] = useInvokeSnapMutation();

  const handleClick = () => {
    invokeSnap({
      snapId: MANAGE_STATE_ACTUAL_ID,
      method: 'clearTestData',
    });
  };

  return (
    <>
      <Button
        data-testid="clear-data-button"
        onClick={handleClick}
        disabled={isLoading}
        className="mb-3"
      >
        Clear Data
      </Button>
      <Result>
        <span data-testid="clear-result">{JSON.stringify(data, null, 2)}</span>
      </Result>
    </>
  );
};
