import type { Option, Constraint } from '../core/referee';

export const frontendOptions: Option[] = [
    {
        id: 'react',
        name: 'React',
        description: 'The industry standard. Huge ecosystem, flexible, but requires many decisions.',
        attributes: {
            agility: 7,
            scalability: 9,
            ecosystem: 10,
            performance: 8,
        },
        pros: ['Massive ecosystem', 'Hireable talent everywhere', 'Flexible architecture'],
        cons: ['Decision fatigue (libraries)', 'High learning curve for hooks'],
    },
    {
        id: 'vue',
        name: 'Vue.js',
        description: 'The progressive framework. Easy to pick up, structured but flexible.',
        attributes: {
            agility: 9,
            scalability: 7,
            ecosystem: 7,
            performance: 9,
        },
        pros: ['Excellent documentation', 'Easy to learn', 'Clean separation of concerns'],
        cons: ['Smaller market share', 'Fewer jobs than React'],
    },
    {
        id: 'angular',
        name: 'Angular',
        description: 'The full-blown platform. Batteries included, opinionated, powerful.',
        attributes: {
            agility: 5, // Boilerplate heavy
            scalability: 10,
            ecosystem: 8,
            performance: 7,
        },
        pros: ['Strict structure good for large teams', 'Batteries included (Router, HTTP)'],
        cons: ['Steep learning curve', 'Verbose', 'Slower dev start'],
    }
];

export const frontendConstraints: Constraint[] = [
    {
        id: 'team_exp',
        label: 'Team Experience Level',
        type: 'slider', // 0 (Junior) to 1 (Senior)
        // Actually simpler: "Need for Ease of Use"
        // Let's reframe: "Importance of Ease/Learning"
        weight: 10,
        targetAttribute: 'agility',
    },
    {
        id: 'project_scale',
        label: 'Project Scale',
        type: 'slider', // Low to High
        weight: 10,
        targetAttribute: 'scalability',
    },
    {
        id: 'timeline',
        label: 'Timeline Pressure',
        type: 'slider', // Relaxed to Tight
        weight: 8,
        targetAttribute: 'agility',
    },
    {
        id: 'jobs',
        label: 'Hiring/Ecosystem Importance',
        type: 'slider',
        weight: 9,
        targetAttribute: 'ecosystem',
    }
];
