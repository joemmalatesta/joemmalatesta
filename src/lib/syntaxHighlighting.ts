import Prism from 'prismjs';
// Available Prism themes:
// - prism.css (default)
// - prism-dark.css
// - prism-funky.css 
// - prism-okaidia.css
// - prism-twilight.css
// - prism-coy.css
// - prism-solarizedlight.css
// - prism-tomorrow.css
import 'prismjs/themes/prism-tomorrow.css'; // Currently using tomorrow theme

export function highlight(code: string, language: string) {
  return Prism.highlight(code, Prism.languages[language], language);
}