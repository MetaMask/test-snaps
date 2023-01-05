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

const DIALOG_SNAP_ID = 'npm:@metamask/test-snap-dialog';
const DIALOG_SNAP_PORT = 8008;

export const Dialog: FunctionComponent = () => {
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
      snapId: getSnapId(DIALOG_SNAP_ID, DIALOG_SNAP_PORT),
      method: 'dialogAlert',
      params: [title, description, textAreaContent],
    });
  };

  return (
    <Snap
      name="Dialog Snap"
      snapId={DIALOG_SNAP_ID}
      port={DIALOG_SNAP_PORT}
      testId="DialogSnap"
    >
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleChange(setTitle)}
            id="msgTitle"
            className="mb-2"
          />

          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleChange(setDescription)}
            id="msgDescription"
            className="mb-2"
          />

          <Form.Label>Textarea Content</Form.Label>
          <Form.Control
            type="text"
            placeholder="Textarea Content"
            value={textAreaContent}
            onChange={handleChange(setTextAreaContent)}
            id="msgTextarea"
            className="mb-3"
          />
        </Form.Group>

        <Button type="submit" id="sendDialogButton" disabled={isLoading}>
          Submit
        </Button>
      </Form>

      <Result>
        <span id="dialogResult">{JSON.stringify(data, null, 2)}</span>
      </Result>
    </Snap>
  );
};
