// components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link'; // Import Link for client-side navigation if needed

// Define the Footer component as a functional component
const Footer: React.FC = () => {
  return (
    // <footer> semantic HTML tag is appropriate for a site footer
    // Styling with Tailwind CSS:
    // - border-t: Adds a border to the top of the footer, separating it from the main content.
    // - border-border: Uses the standard border color from your theme.
    // - bg-muted: Uses the muted background color from the theme (often a light gray or dark gray), suitable for less prominent areas.
    // - text-muted-foreground: Uses the text color designed to contrast with the muted background.
    <footer className="border-t border-border bg-muted text-muted-foreground">
      {/* Container to manage padding and centering content */}\n      {/* - container: Applies max-width and centers the content. */}\n      {/* - flex: Enables Flexbox layout. */}\n      {/* - flex-col sm:flex-row: Stacks items vertically on small screens, horizontally on larger screens. */}\n      {/* - items-center: Centers items along the cross-axis (horizontally in col layout, vertically in row layout). */}\n      {/* - justify-between: Puts space between flex items along the main axis. */}\n      {/* - py-4: Adds vertical padding (4 * 0.25rem = 1rem or 16px by default). */}\n      {/* - px-4 sm:px-6 lg:px-8: Adds horizontal padding, adjusting for different screen sizes. */}
      <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row sm:py-4 px-4 sm:px-6 lg:px-8">
        {/* Copyright Information */}
        {/* - text-sm: Sets a smaller text size. */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Dashboard Builder. All rights reserved.
        </p>

        {/* Optional: Links (e.g., Privacy Policy, Terms) */}
        {/* - flex: Enables Flexbox. */}\n        {/* - gap-4: Adds space between flex items. */}
        <div className="flex gap-4">
          {/* Example links - replace '#' with actual paths later */}
          <Link href="#" className="text-sm hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

// Export the component for use in other files (like the root layout)
export default Footer;