'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('../../../components/SplineEmbed'))

interface SplineSceneProps {
    scene: string
    className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-pulse">
                        <div className="w-16 h-16 border-2 border-t-transparent border-[#00D2BE] rounded-full animate-spin"></div>
                    </div>
                </div>
            }
        >
            <Spline
                scene={scene}
                className={className}
                style={{}}
                onLoad={() => { }}
            />
        </Suspense>
    )
}
