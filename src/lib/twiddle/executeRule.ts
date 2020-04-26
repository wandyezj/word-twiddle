import { Rule } from "./twiddleJson";
import { executeRuleWordReplace } from "./executeRuleWordReplace";
import { executeRuleWordHighlight } from "./executeRuleWordHighlight";
import { executeRuleReplace } from "./executeRuleReplace";
import { executeRuleHighlight } from "./executeRuleHighlight";

export async function executeRule(rule: Rule) {
    const replace = rule.replace;
    const highlight = rule.highlight;
    const replaceWords = rule.replaceWords;
    const highlightWords = rule.highlightWords;

    if (replace) {
        await executeRuleReplace(replace);
    } else if (highlight) {
        await executeRuleHighlight(highlight);
    } else if (replaceWords) {
        await executeRuleWordReplace(replaceWords);
    } else if (highlightWords) {
        await executeRuleWordHighlight(highlightWords);
    } else {
        console.log(`Rule matched no rules: 
${JSON.stringify(rule)}`);
    }
}
