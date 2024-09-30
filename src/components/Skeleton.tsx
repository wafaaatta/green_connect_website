import React from 'react';

// Utility function to create a skeleton element
export const SkeletonElement = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Text skeleton
export const TextSkeleton = () => (
  <div className="space-y-2">
    <SkeletonElement className="h-4 w-3/4" />
    <SkeletonElement className="h-4 w-full" />
    <SkeletonElement className="h-4 w-5/6" />
  </div>
);

// Avatar skeleton
export const AvatarSkeleton = () => (
  <SkeletonElement className="h-12 w-12 rounded-full" />
);

// Button skeleton
export const ButtonSkeleton = () => (
  <SkeletonElement className="h-10 w-24 rounded" />
);

// Custom Card Component
interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  bgColor?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  headerAction,
  bgColor = 'bg-white',
}) => {
  const isHexColor = bgColor.startsWith('#');

  return (
    <div
      className={`shadow rounded ${className} ${!isHexColor ? bgColor : ''} dark:bg-gray-800`}
      style={isHexColor ? { backgroundColor: bgColor } : {}}
    >
      {title && (
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

// Card skeleton
export const CardSkeleton = () => (
  <Card>
    <div>
      <SkeletonElement className="h-6 w-3/4 mb-2" />
    </div>
    <div>
      <TextSkeleton />
    </div>
  </Card>
);

// List skeleton
export const ListSkeleton = ({ items = 3 }) => (
  <ul className="space-y-4">
    {[...Array(items)].map((_, i) => (
      <li key={i} className="flex items-center space-x-4">
        <AvatarSkeleton />
        <div className="flex-1">
          <SkeletonElement className="h-4 w-3/4 mb-2" />
          <SkeletonElement className="h-4 w-1/2" />
        </div>
      </li>
    ))}
  </ul>
);

// Table skeleton
export const TableSkeleton = ({ rows = 3, cols = 4 }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr>
          {[...Array(cols)].map((_, i) => (
            <th key={i} className="p-2">
              <SkeletonElement className="h-6 w-full" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(cols)].map((_, colIndex) => (
              <td key={colIndex} className="p-2">
                <SkeletonElement className="h-4 w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Image skeleton
export const ImageSkeleton = ({ aspectRatio = "16/9" }) => (
  <div className="relative" style={{ paddingBottom: `calc(100% / (${aspectRatio}))` }}>
    <SkeletonElement className="absolute inset-0 rounded" />
  </div>
);
