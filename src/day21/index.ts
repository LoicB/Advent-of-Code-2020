import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => inputToStringList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: string[]): number | undefined => {
    const {ingredientsCount} = getIngredientWithNoAllergenCounts(input);
    return Array.from(ingredientsCount.values()).reduce((a, b) => a + b);
}

const getIngredientWithNoAllergenCounts = (input: string[]) => {
    const allergensToIngredients: Map<string, string[]> = new Map<string, string[]>();
    const ingredientsCount: Map<string, number> = new Map<string, number>();
    input.forEach(food => {
        const ingredients: string[] = getIngredients(food);
        const allergens: string[] = getAllergens(food);
        allergens.forEach(allergen => {
            if (allergensToIngredients.has(allergen)) {
                const ingredientsForAllergen = findCommonIngredients(ingredients, allergensToIngredients.get(allergen) || ingredients);
                allergensToIngredients.set(allergen, ingredientsForAllergen);
            } else {
                allergensToIngredients.set(allergen, ingredients);
            }
        })
        ingredients.forEach(ingredient => {
            ingredientsCount.set(ingredient, (ingredientsCount.get(ingredient) || 0) + 1);
        })
    })
    allergensToIngredients.forEach((ingredients: string[], _: string) => {
        ingredients.forEach(ingredient => ingredientsCount.delete(ingredient));
    });
    return {allergensToIngredients, ingredientsCount};
}

export const getIngredients = (food: string): string[] => {
    return food.substring(0, food.indexOf('(')).split(' ').filter(ingredient => ingredient.trim().length > 0);
}

export const getAllergens = (food: string): string[] => {
    return food.substring(food.indexOf(' ', food.indexOf('('))).split(' ').map(value => value.substring(0, value.length - 1)).filter(allergen => allergen.trim().length > 0);
}

export const findCommonIngredients = (ingredientList1: string[], ingredientList2: string[]): string[] => {
    const commonIngredients: string[] = [];
    ingredientList1.forEach(ingredient => {
        if (ingredientList2.indexOf(ingredient) >= 0) {
            commonIngredients.push(ingredient);
        }
    })
    return commonIngredients;
}

export const partTwo = (input: string[]): string | undefined => {
    const {allergensToIngredients} = getIngredientWithNoAllergenCounts(input);
    const allergensToSingleIngredient = removeDuplicatePossible(allergensToIngredients);
    const allergens = Array.from(allergensToSingleIngredient.keys()).sort();
    const ingredients:string[] =[];
    allergens.forEach(allergen => ingredients.push(allergensToSingleIngredient.get(allergen) || ''));
    return ingredients.join(',');
}

const removeDuplicatePossible = (allergensToIngredients: Map<string, string[]>): Map<string, string> => {
    const result: Map<string, string> = new Map<string, string>();
    const singleIngredients: string[] = [];
    while (allergensToIngredients.size > 0) {
        allergensToIngredients.forEach((value, key) => {
            if (value.length === 1) {
                singleIngredients.push(value[0]);
                result.set(key, value[0]);
            }
        });
        result.forEach((_, key) => {
            allergensToIngredients.delete(key);
        });
        for (let key of Array.from(allergensToIngredients.keys())) {
            const array: string[] = (allergensToIngredients.get(key) || []).filter(value => singleIngredients.indexOf(value) === -1);
            allergensToIngredients.set(key, array);
        }
    }
    return result;

}


runPartOneAndTwo(partOne, partTwo, input)
