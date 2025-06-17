import React, { useRef, useEffect } from 'react';

import { jarallax, jarallaxVideo } from 'jarallax';
import 'jarallax/dist/jarallax.min.css';

// Optional video extension
jarallaxVideo();

import { ReactNode } from 'react';

interface JarallaxProps {
    className?: string;
    children?: ReactNode;
    [key: string]: any;
}

export default function Jarallax({ className = '', children, ...props }: JarallaxProps) {
    const $el = useRef<HTMLDivElement>(null);

    // Init Jarallax.
    useEffect(() => {
        if ($el.current) {
            jarallax($el.current, props);
        }

        // Destroy Jarallax.
        return function destroy() {
            if ($el.current) {
                jarallax($el.current, 'destroy');
            }
        };
    }, []);

    // Update options.
    useEffect(() => {
        if ($el.current) {
            jarallax($el.current, 'destroy');
            jarallax($el.current, props);
        }
    }, [props]);

    return (
        <div ref={$el} className={`jarallax ${className}`}>
            {children}
        </div>
    );
}