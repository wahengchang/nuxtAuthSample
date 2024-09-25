export const fieldTypes = [{
        value: 'text',
        label: 'Text',
        component: 'v-text-field'
    },
    {
        value: 'number',
        label: 'Number',
        component: 'v-text-field',
        props: { type: 'number' }
    },
    {
        value: 'date',
        label: 'Date',
        component: 'v-date-picker'
    },
    {
        value: 'relation',
        label: 'Relation',
        component: 'v-select',
        props: { items: [] } // This would be populated with available collections
    },
    {
        value: 'text-area',
        label: 'Text Area',
        component: 'v-textarea'
    }
]

export const getFieldTypeConfig = (type) => fieldTypes.find(ft => ft.value === type)