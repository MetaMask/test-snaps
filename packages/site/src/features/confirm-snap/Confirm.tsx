import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { Result, Snap } from '../../components';
import { useInvokeMutation } from '../../api';
import { getSnapId } from '../../utils/id';

const CONFIRM_SNAP_ID = 'npm:@metamask/test-snap-confirm';
const CONFIRM_SNAP_PORT = 8001;

export const Confirm: FunctionComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [textAreaContent, setTextAreaContent] = useState('');
  const [invokeSnap, { isLoading, data }] = useInvokeMutation();

  const handleChange =
    (fn: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      fn(event.target.value);
    };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    invokeSnap({
      snapId: getSnapId(CONFIRM_SNAP_ID, CONFIRM_SNAP_PORT),
      method: 'confirm',
      params: [title, description, textAreaContent],
    });
  };

  return (
    <Snap
      name="Confirm Snap"
      snapId={CONFIRM_SNAP_ID}
      port={CONFIRM_SNAP_PORT}
      testId="ConfirmSnap"
    >
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleChange(setTitle)}
            data-testid="title"
            className="mb-2"
          />

          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleChange(setDescription)}
            data-testid="description"
            className="mb-2"
          />

          <Form.Label>Textarea Content</Form.Label>
          <Form.Control
            type="text"
            placeholder="Textarea Content"
            value={textAreaContent}
            onChange={handleChange(setTextAreaContent)}
            data-testid="textarea-content"
            className="mb-3"
          />
        </Form.Group>

        <Button
          type="submit"
          id="sendConfirmButton"
          data-testid="submit"
          disabled={isLoading}
        >
          Submit
        </Button>
      </Form>

      <Result>
        <span id="confirmResult" data-testid="confirm-result">
          {JSON.stringify(data, null, 2)}
        </span>
      </Result>
    </Snap>
  );
};
