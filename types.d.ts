/// <reference types="next" />
/// <reference types="next/image-types/global" />

import { FC, SVGProps } from 'react'

declare module 'lucide-react' {
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    color?: string
    strokeWidth?: number | string
  }
  
  export const Phone: FC<IconProps>
  export const Mail: FC<IconProps>
  export const MapPin: FC<IconProps>
}

declare module 'next/image' {
  import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
  
  export interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    loader?: any
    quality?: number
    priority?: boolean
    loading?: 'lazy' | 'eager'
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
    unoptimized?: boolean
    onLoadingComplete?: any
  }
  
  const Image: FC<ImageProps>
  export default Image
}

// Add JSX namespace declaration
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
} 