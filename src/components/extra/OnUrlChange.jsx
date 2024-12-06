'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const OnUrlChange = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Scroll to the top of the page when the location changes
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    }, [pathname]);

    return null;
};

export default OnUrlChange;
