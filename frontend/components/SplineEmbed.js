"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Application } from '@splinetool/runtime';

export default function SplineEmbed({ scene, style, onLoad, className, ...props }) {
    const canvasRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let app;
        let mounted = true;

        if (canvasRef.current) {
            try {
                app = new Application(canvasRef.current);
                app.load(scene)
                    .then(() => {
                        if (mounted) {
                            setIsLoading(false);
                            onLoad?.(app);
                        }
                    })
                    .catch((err) => {
                        console.error("Spline load error:", err);
                    });
            } catch (e) {
                console.error("Spline init error:", e);
            }
        }

        return () => {
            mounted = false;
            if (app) {
                app.dispose();
            }
        };
    }, [scene]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                display: 'block', // Prevent inline spacing issues
                ...style
            }}
            {...props}
        />
    );
}
