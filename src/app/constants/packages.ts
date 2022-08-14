import { Package } from "../models/package.model";

export const packages: Package[] = [
    {
        id: 'standard',
        name: 'Standard',
        description: 'Standard',
        percentage: 0,
    },
    {
        id: 'safe',
        name: 'Safe',
        description: 'Safe (+250HKD, 50%)',
        percentage: 50,
    },
    {
        id: 'super_safe',
        name: 'Super Safe',
        description: 'Super Safe (+375',
        percentage: 75,
    },
];