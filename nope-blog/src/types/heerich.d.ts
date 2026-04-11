declare module 'heerich' {
  interface CameraConfig {
    type?: 'oblique' | 'perspective';
    angle?: number;
    distance?: number;
    position?: [number, number];
  }

  interface StyleConfig {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeLinejoin?: string;
    opacity?: number;
    strokeDasharray?: string;
    strokeLinecap?: string;
    strokeOpacity?: string;
    fillOpacity?: string;
    [key: string]: string | number | undefined;
  }

  interface FaceStyles {
    default?: StyleConfig;
    top?: StyleConfig;
    bottom?: StyleConfig;
    left?: StyleConfig;
    right?: StyleConfig;
    front?: StyleConfig;
    back?: StyleConfig;
  }

  type StyleFunction = (x: number, y: number, z: number) => StyleConfig;
  type FaceStyleFunction = (x: number, y: number, z: number) => FaceStyles;

  interface GeometryOptions {
    type: 'box' | 'sphere' | 'line' | 'fill';
    mode?: 'union' | 'subtract' | 'intersect' | 'exclude';
    position?: [number, number, number];
    center?: [number, number, number];
    size?: [number, number, number] | number;
    radius?: number;
    from?: [number, number, number];
    to?: [number, number, number];
    shape?: 'rounded' | 'square';
    bounds?: [[number, number, number], [number, number, number]];
    test?: (x: number, y: number, z: number) => boolean;
    style?: FaceStyles | ((x: number, y: number, z: number) => StyleConfig);
    content?: string;
    opaque?: boolean;
    scale?: [number, number, number] | ((x: number, y: number, z: number) => [number, number, number] | null);
    scaleOrigin?: [number, number, number];
    rotate?: { axis: 'x' | 'y' | 'z'; turns: number };
  }

  interface SVGOptions {
    padding?: number;
    viewBox?: [number, number, number, number];
    offset?: [number, number];
    prepend?: string;
    append?: string;
    faces?: unknown[];
    faceAttributes?: (face: unknown) => Record<string, string> | null;
  }

  interface HeerichConstructor {
    camera?: CameraConfig;
    style?: StyleConfig;
    tile?: number;
  }

  export class Heerich {
    constructor(config?: HeerichConstructor);
    applyGeometry(options: GeometryOptions): void;
    addGeometry(options: GeometryOptions): void;
    removeGeometry(options: GeometryOptions): void;
    clear(): void;
    setCamera(config: CameraConfig): void;
    toSVG(options?: SVGOptions): string;
    getBounds(padding?: number): { x: number; y: number; w: number; h: number };
    rotate(config: { axis: 'x' | 'y' | 'z'; turns: number; center?: [number, number, number] }): void;
    toJSON(): unknown;
    static fromJSON(data: unknown): Heerich;
  }
}
