export const Operator = {
    integer: {
        hasValue: true,
        operators: [
            {
                label: 'Equal',
                value: '=',
            },
            {
                label: 'Not equal to',
                value: '!=',
            },
            {
                label: 'Greater than',
                value: '>',
            },
            {
                label: 'Greater than or equal',
                value: '>=',
            },
            {
                label: 'Less than',
                value: '<',
            },
            {
                label: 'Less than or equal',
                value: '<=',
            },
        ],
    },
    string: {
        hasValue: true,
        operators: [
            {
                label: 'Equal',
                value: '=',
            },
            {
                label: 'Not equal to',
                value: '!=',
            },
        ],
    },
    boolean: {
        hasValue: false,
        operators: [
            {
                label: 'Is true',
                value: 'is_true',
            },
        ],
    },
};
