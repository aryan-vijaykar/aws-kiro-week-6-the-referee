export interface Option {
    id: string;
    name: string;
    description: string;
    attributes: Record<string, number>; // Mapping of attribute ID to score (0-10)
    pros: string[];
    cons: string[];
}

export interface Constraint {
    id: string;
    label: string;
    type: 'slider' | 'select' | 'boolean';
    weight: number; // 0-10 impact on decision
    targetAttribute: string; // The attribute in Option this constraint cares about
    // For sliders/selects, we might need mapping logic, but for simplicity:
    // We assume User Input (0-10) * Constraint Weight * Option Attribute Score
}

export interface UserInput {
    constraintId: string;
    value: number; // Normalized 0-1 (e.g., "Budget Importance" 0.8)
}

export interface ScoringResult {
    optionId: string;
    totalScore: number;
    breakdown: { constraintId: string; score: number }[];
    matchPercentage: number;
}

export class RefereeEngine {
    private options: Option[];
    private constraints: Constraint[];

    constructor(options: Option[], constraints: Constraint[]) {
        this.options = options;
        this.constraints = constraints;
    }

    evaluate(inputs: UserInput[]): ScoringResult[] {
        const results: ScoringResult[] = this.options.map(option => {
            let totalScore = 0;
            const breakdown: { constraintId: string; score: number }[] = [];
            let maxPossibleScore = 0;

            inputs.forEach(input => {
                const constraint = this.constraints.find(c => c.id === input.constraintId);
                if (!constraint) return;

                const attributeValue = option.attributes[constraint.targetAttribute] || 0;
                // Logic: 
                // If I need "High speed" (Input=1.0) and Option has "Speed=9" (0.9), score is high.
                // If I need "Low Cost" (Input=1.0) and Option has "Cost=9" (High cost), score is LOW?
                // Wait, "Attribute" needs to be aligned. 
                // Let's assume Attributes are "Positive qualities" relative to the constraint?
                // Or we map: Constraint "Budget Sensitive" -> targetAttribute "CostEfficiency"

                const weightedScore = (attributeValue / 10) * input.value * constraint.weight;
                totalScore += weightedScore;
                breakdown.push({ constraintId: constraint.id, score: weightedScore });

                maxPossibleScore += (1.0 * input.value * constraint.weight); // If attribute was 10
            });

            const matchPercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

            return {
                optionId: option.id,
                totalScore,
                breakdown,
                matchPercentage
            };
        });

        return results.sort((a, b) => b.totalScore - a.totalScore);
    }
}
