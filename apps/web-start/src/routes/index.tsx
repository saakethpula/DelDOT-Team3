import { Link, createFileRoute } from '@tanstack/react-router';

  export const Route = createFileRoute('/')({
    component: RouteComponent,
  });

function RouteComponent() {
  return (
    <div>
      Hello "/"!
      <Link to="/search"> Search Page</Link>
    </div>
  );
}
