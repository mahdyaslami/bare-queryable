import query from './index.js'

const data = [
    {
        id: 0,
        name: 'aaaa'
    },
    {
        id: 1,
        name: 'abaa'
    },
    {
        id: 2,
        name: 'aaca'
    },
    {
        id: 3,
        name: 'aaad'
    }
]

test('get all data', () => {
    const result = query(data).get()

    expect(result).toEqual(data)
})

test('get first item', () => {
    const result = query(data).first()

    expect(result).toEqual(data[0])
})

test('get last item', () => {
    const result = query(data).last()

    expect(result).toEqual(data[3])
})

test('where equal', () => {
    const result = query(data).where('id').equal(2).get()

    expect(result).toEqual([data[2]]);
})

test('where above', () => {
    const result = query(data)
        .where('id').above(2)
        .get()

    expect(result).toEqual([data[3]])
})

test('where above or equal', () => {
    const result = query(data)
        .where('id').aboveOrEqual(2)
        .get()

    expect(result).toEqual([data[2], data[3]])
})

test('where below', () => {
    const result = query(data)
        .where('id').below(2)
        .get()

    expect(result).toEqual([data[0], data[1]])
})

test('where below or equal', () => {
    const result = query(data)
        .where('id').belowOrEqual(1)
        .get()

    expect(result).toEqual([data[0], data[1]])
})

test('where in', () => {
    const result = query(data)
        .where('id').in([1, 3])
        .get()

    expect(result).toEqual([data[1], data[3]])
})

test('where contain', () => {
    const result = query(data)
        .where('name').contain('b')
        .get()

    expect(result).toEqual([data[1]])
})

test('and two conditions', () => {
    const result = query(data)
        .where('id').equal(1)
        .where('id').above(2)
        .get()

    expect(result).toEqual([])
})

test('or two conditions', () => {
    const result = query(data)
        .where('id').equal(1)
        .orWhere('id').above(2)
        .get()

    expect(result).toEqual([data[1], data[3]])
})

test('prevent duplicate item that staisfy two or conditions', () => {
    const result = query(data)
        .where('id').above(1)
        .orWhere('id').equal(2)
        .get()

    expect(result).toEqual([data[2], data[3]])
})

test('query on 10000 obj be less than 50ms', () => {
    const array = factory(10000)

    const start = now()
    query(array)
        .where('id').above(50)
        .where('id').below(9950)
        .orWhere('id').in([2, 3, 5, 7])
        .where('name').contain(6)
        .get()

    const end = now()

    expect(end - start).toBeLessThan(50)
})

function factory(count) {
    const array = []

    for (let i = 1; i <= count; i++) {
        array.push({
            id: i,
            name: hash()
        })
    }

    return array
}

function now() {
    return (new Date).getTime()
}

function hash(length = 5) {
    return (Math.random() + 1).toString(36).substring(length)
}