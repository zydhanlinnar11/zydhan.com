import { Prism } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SyntaxHighlighterProps {
    language: string;
    value: string;
}

const SyntaxHighlighter = ({ language, value }: SyntaxHighlighterProps) => {
    return (
        <Prism
            language={language}
            style={materialOceanic}
            customStyle={preStyles}
            wrapLines={true}
            showLineNumbers={true}
        >
            {value}
        </Prism>
    );
};

const preStyles = {
    fontSize: ".8em",
};

export default SyntaxHighlighter;
