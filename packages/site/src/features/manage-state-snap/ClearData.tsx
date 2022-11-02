import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { Result } from '../../components';
import { Tag, useInvokeMutation } from '../../api';
import { MANAGE_STATE_ACTUAL_ID } from './ManageState';

export const ClearData: FunctionComponent = () => {
  const [invokeSnap, { isLoading, data }] = useInvokeMutation();

  const handleClick = () => {
    invokeSnap({
      snapId: MANAGE_STATE_ACTUAL_ID,
      method: 'clearTestData',
      tags: [Tag.TestState],
    });
  };

  return (
    <>
      <Button
        id="clearManageState"
        data-testid="clear-data-button"
        onClick={handleClick}
        disabled={isLoading}
        className="mb-3"
      >
        Clear Data
      </Button>
      <Result>
        <span id="clearManageStateResult" data-testid="clear-result">
          {JSON.stringify(data, null, 2)}
        </span>
      </Result>
    </>
  );
};
