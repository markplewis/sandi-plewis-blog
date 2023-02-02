// The following import works because we have `"resolveJsonModule": true` in `jsconfig.js`.

// Someday we'll be able to use Import Assertions instead:
// https://v8.dev/features/import-assertions

// Some other import methods are listed here:
// - https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
// - https://stackoverflow.com/questions/34944099/how-to-import-a-json-file-in-ecmascript-6

import * as designTokens from "./design-tokens.json";

export default designTokens;
