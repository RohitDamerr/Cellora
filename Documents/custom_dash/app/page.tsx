import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next'; // Import server-side helper

export default async function HomePage() {
  // Fetch session data on the server
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Welcome to Dashboard Builder</h1>
      {session ? (
        <p>Hello, {session.user?.name || 'User'}! You are logged in.</p>
      ) : (
        <p>Please sign in to manage your dashboards.</p>
      )}
      {/* ... rest of the page content */}
    </div>
  );
}