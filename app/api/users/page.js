import Heading from '@/app/_ui/Heading';
import Row from '@/app/_ui/Row';
import { UserSelectionProvider } from '../context/UserSelectionContext';
import UserTable from '../features/users/UserTable';
import UserTableOperations from '../features/users/UserTableOperations';

function page() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All users</Heading>
        <UserTableOperations />
      </Row>

      <UserSelectionProvider>
        <UserTable />
      </UserSelectionProvider>
    </>
  );
}

export default page;
