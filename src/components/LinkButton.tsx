import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkButtonProps {
    to: string;
    className?: string;
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
    to,
    className,
    variant = 'primary',
    children,
}) => {
    const buttonClasses =
        variant === 'primary'
            ? 'bg-white text-green-600 font-semibold py-3 px-8 rounded-full text-lg hover:bg-green-100 transition duration-300 inline-block'
            : 'bg-white text-green-600 font-semibold py-3 px-8 rounded-full text-lg hover:bg-green-100 transition duration-300 inline-block';

    return (
        <RouterLink
            to={to}
            className={`${buttonClasses} ${className}`}
        >
            {children}
        </RouterLink>
    );
};

export default LinkButton;