import { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { graphql, useStaticQuery } from 'gatsby';
import { useInstallSnapMutation } from '../api';
import { ButtonSpinner } from './ButtonSpinner';

interface ConnectProps {
  name: string;
  snapId?: string;
  version?: string;
}

interface Query {
  site: {
    siteMetadata: {
      version: string;
    };
  };
}

export const Connect: FunctionComponent<ConnectProps> = ({
  name,
  snapId: defaultSnapId = '',
  version: defaultVersion,
}) => {
  const [installSnap, { isLoading }] = useInstallSnapMutation();
  const [snapId, setSnapId] = useState(defaultSnapId);
  const { site } = useStaticQuery<Query>(graphql`
    query Version {
      site {
        siteMetadata {
          version
        }
      }
    }
  `);

  const { version } = site.siteMetadata;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSnapId(event.target.value);
  };

  const handleConnect = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    installSnap({ snapId, version: defaultVersion ?? version });
  };

  return (
    <Form onSubmit={handleConnect} className="mb-3">
      <Form.Group className="mb-3">
        <Form.Label>Snap ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Snap ID"
          value={snapId}
          onChange={handleChange}
          data-testid="connect-snap-id"
          disabled={true}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        data-testid="connect-button"
        disabled={isLoading}
      >
        {isLoading ? (
          <ButtonSpinner>Connecting</ButtonSpinner>
        ) : (
          <span>Connect to {name}</span>
        )}
      </Button>
    </Form>
  );
};
