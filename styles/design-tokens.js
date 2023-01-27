// The following import works because we have `"resolveJsonModule": true` in `jsconfig.js`.

// I also tried the following methods but found them problematic in different ways:
// - https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
// - https://stackoverflow.com/questions/34944099/how-to-import-a-json-file-in-ecmascript-6

import * as designTokens from "./design-tokens.json";

export default designTokens;
