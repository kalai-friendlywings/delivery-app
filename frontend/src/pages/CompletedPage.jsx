import { Container, Card } from 'react-bootstrap';

const completedOrders = [
  {
    id: 'ORD-004',
    customerName: 'Rahul Mehta',
    address: '21, Brigade Road, Bengaluru',
    deliveredAt: '10:45 AM',
  },
  {
    id: 'ORD-005',
    customerName: 'Sneha Desai',
    address: '9th Block, Jayanagar, Bengaluru',
    deliveredAt: '11:10 AM',
  },
  {
    id: 'ORD-006',
    customerName: 'Arun Raj',
    address: 'BTM Layout, Bengaluru',
    deliveredAt: '11:35 AM',
  },
];

function CompletedPage() {
  return (
    <Container className="pt-4">
      <h3 className="mb-4">✅ Completed Orders</h3>
      {completedOrders.map((order) => (
        <Card className="mb-3" key={order.id}>
          <Card.Body>
            <h5>{order.customerName}</h5>
            <p className="text-muted">{order.address}</p>
            <p className="mb-0">
              <strong>Delivered At:</strong> {order.deliveredAt}
            </p>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default CompletedPage;
