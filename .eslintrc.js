module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
        "extends": [
            "airbnb-base",
            "prettier"
        ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-plusplus": 0, 
        "import/no-cycle": 0,
        "import/prefer-default-export": 0,
        "no-alert": 0,
        "func-names": 0,
        "no-restricted-globals": 0,
        'no-param-reassign': ["error", { "props": true }]
    }
};
