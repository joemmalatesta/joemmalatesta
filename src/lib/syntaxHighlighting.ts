import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // or any other theme you prefer

export function highlight(code: string, language: string) {
  return Prism.highlight(code, Prism.languages[language], language);
}