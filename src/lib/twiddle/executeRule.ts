import { Rule } from "./twiddleJson";
import { executeRuleWordReplace } from "./executeRuleWordReplace";
import { executeRuleWordHighlight } from "./executeRuleWordHighlight";

export async function executeRule(rule: Rule) {
    const replaceWords = rule.replaceWords;
    const highlightWords = rule.highlightWords;

    if (replaceWords) {
        await executeRuleWordReplace(replaceWords);
    } else if (highlightWords) {
        await executeRuleWordHighlight(highlightWords);
    } else {
        console.log(`Rule matched no rules: 
${JSON.stringify(rule)}`);
    }
}
