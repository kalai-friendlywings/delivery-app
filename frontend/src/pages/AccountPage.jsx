import { Container, Card, Button } from 'react-bootstrap';

function AccountPage({ user, onLogout }) {
  return (
    <Container className="pt-4">
      <Card>
        <Card.Body>
          <h3 className="mb-3">👤 Account</h3>
          <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
          <p><strong>Partner ID:</strong> {user?.id || 'N/A'}</p>
          <Button variant="danger" onClick={onLogout}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AccountPage;
