import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getDisplayName = (segment) => {
    switch (segment) {
      case "client":
        return "Dashboard";
      case "groups":
        return "Groups";
      case "add":
        return "Add Member";
      default:
        // Handle dynamic IDs or custom paths
        return isNaN(segment)
          ? segment.charAt(0).toUpperCase() + segment.slice(1)
          : `Details`;
    }
  };

  // Remove "client" from the visible breadcrumbs if you don't want it shown
  const visibleSegments = pathnames.filter((seg) => seg !== "client");

  return (
    <nav className="text-gray-500 text-sm uppercase lg:text-sm mb-4">
      <ul className="flex flex-wrap items-center space-x-1">
        {visibleSegments.map((segment, index) => {
          const routeTo = `/${pathnames.slice(0, index + 2).join("/")}`; // Keeps links accurate even when client is hidden
          const isLast = index === visibleSegments.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              {isLast ? (
                <span className="text-primary text- font-semibold underline-offset-4 underline">
                  {getDisplayName(segment)}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-primary font-medium transition-colors"
                >
                  {getDisplayName(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
