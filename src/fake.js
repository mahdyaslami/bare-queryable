export const users = [
    {
        id: 0,
        parent_id: 0,
        name: 'aaaa',
        intval: 3,
        strval: 'd',
        dateval: '11/22/2021, 11:43:48 AM',
        strval2: 'b',
        nestedVal: {
            age: 10,
        },
    },
    {
        id: 1,
        parent_id: 0,
        name: 'abaa',
        intval: 0,
        strval: 'a',
        dateval: '10/2/2021, 11:42:48 AM',
        strval2: 'a',
        nestedVal: {
            age: 30,
        },
    },
    {
        id: 2,
        parent_id: 1,
        name: 'aaca',
        intval: 2,
        strval: 'c',
        dateval: '11/12/2021, 11:42:50 AM',
        strval2: 'b',
        nestedVal: {
            age: 20,
        },
    },
    {
        id: 3,
        name: 'aaad',
        intval: 1,
        strval: 'b',
        dateval: '11/2/2021, 11:42:48 AM',
        strval2: 'a',
        nestedVal: {
            age: 40,
        },
    },
]

export const parents = [
    {
        id: 0,
        title: '1000',
    },
    {
        id: 1,
        title: '0100',
    },
    {
        id: 2,
        title: '0010',
    },
]
