// components/layout/Navbar.tsx
import Link from 'next/link'; // Import Link for client-side navigation
import React from 'react';

// Define the Navbar component as a functional component
const Navbar: React.FC = () => {
  return (
    // <header> semantic HTML tag is appropriate for a navigation bar
    // Styling with Tailwind CSS:
    // - bg-card: Uses the background color defined for Card elements in your theme (via CSS variables). Often slightly different from the main background.
    // - border-b: Adds a border to the bottom of the header.
    // - border-border: Uses the border color defined in your theme (via CSS variables).
    // - sticky: Makes the navbar stick to the top of the viewport when scrolling.
    // - top-0: Ensures the sticky position starts right at the top.
    // - z-50: Sets the stack order, ensuring the navbar stays above most other content.
    // - w-full: Makes the header take the full width of its container.
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      {/* Container to manage padding and centering content */}
      {/* - container: Applies max-width and centers the content (Tailwind default or as configured in tailwind.config.ts). */}
      {/* - flex: Enables Flexbox layout. */}
      {/* - h-14: Sets a fixed height for the navbar (14 * 0.25rem = 3.5rem or 56px by default). */}
      {/* - items-center: Aligns flex items vertically in the center. */}
      {/* - px-4 sm:px-6 lg:px-8: Adds horizontal padding, adjusting for different screen sizes. */}
      <div className="container flex h-14 items-center px-4 sm:px-6 lg:px-8">
        {/* Left Section: Application Title/Logo */}
        {/* - mr-auto: Pushes the elements after this one to the right using auto margin. */}
        <div className="mr-auto flex items-center">
          {/* Use Next.js Link for optimized client-side navigation to the homepage */}
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Placeholder for a logo - could be an SVG or Image component later */}
            {/* <span className="text-2xl font-bold">📊</span> Emoji placeholder */}
            {/* Application Title */}
            {/* - font-bold: Makes the text bold. */}
            {/* - text-lg: Sets a larger text size. */}
            {/* - text-foreground: Uses the primary text color from your theme. */}
            <span className="font-bold text-lg text-foreground">Dashboard Builder</span>
          </Link>
          {/* Placeholder for future navigation links (e.g., "Dashboards", "Settings") */}
          {/* <nav className="hidden md:flex space-x-4">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Dashboards
            </Link>
          </nav> */}
        </div>

        {/* Right Section: Actions (e.g., Login/Logout Button) */}
        {/* - flex: Enables Flexbox. */}
        {/* - items-center: Vertically centers items. */}
        {/* - space-x-4: Adds horizontal space between direct children. */}
        <div className="flex items-center space-x-4">
          {/* Placeholder for Authentication Button */}
          {/* We will replace this with actual Sign In/Sign Out functionality in a later step */}
          {/* You could use the Button component you added earlier: */}
          {/* import { Button } from '@/components/ui/button'; */}
          {/* <Button variant="outline" size="sm">Sign In</Button> */}
          <div className="w-20 h-8 bg-muted rounded-md animate-pulse"></div> {/* Placeholder visual */}
        </div>
      </div>
    </header>
  );
};

// Export the component for use in other files (like the root layout)
export default Navbar;
