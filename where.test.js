import query from './query.js'
import {
    users,
} from './fake.js'

test('where equal', () => {
    const result = query(users).where('id').equal(2).get()

    expect(result).toEqual([users[2]])
})

test('where not equal', () => {
    const result = query(users).where('id').notEqual(2).get()

    expect(result).toEqual([users[0], users[1], users[3]])
})

test('where above', () => {
    const result = query(users)
        .where('id').above(2)
        .get()

    expect(result).toEqual([users[3]])
})

test('where above or equal', () => {
    const result = query(users)
        .where('id').aboveOrEqual(2)
        .get()

    expect(result).toEqual([users[2], users[3]])
})

test('where below', () => {
    const result = query(users)
        .where('id').below(2)
        .get()

    expect(result).toEqual([users[0], users[1]])
})

test('where below or equal', () => {
    const result = query(users)
        .where('id').belowOrEqual(1)
        .get()

    expect(result).toEqual([users[0], users[1]])
})

test('where in', () => {
    const result = query(users)
        .where('id').in([1, 3])
        .get()

    expect(result).toEqual([users[1], users[3]])
})

test('where contain', () => {
    const result = query(users)
        .where('name').contain('b')
        .get()

    expect(result).toEqual([users[1]])
})

test('andWhere() can AND two conditions', () => {
    const result = query(users)
        .where('id').equal(1)
        .andWhere('id')
        .above(2)
        .get()

    expect(result).toEqual([])
})

test('where() can AND two conditions', () => {
    const result = query(users)
        .where('id').equal(1)
        .where('id')
        .above(2)
        .get()

    expect(result).toEqual([])
})

test('orWhere can OR two conditions', () => {
    const result = query(users)
        .where('id').equal(1)
        .orWhere('id')
        .above(2)
        .get()

    expect(result).toEqual([users[1], users[3]])
})

test('use nested key in conditions', () => {
    const result = query(users)
        .where('nestedVal.age').equal(30)
        .get()

    expect(result).toEqual([users[1]])
})

test('prevent duplicate item that staisfy two OR conditions', () => {
    const result = query(users)
        .where('id').above(1)
        .orWhere('id')
        .equal(2)
        .get()

    expect(result).toEqual([users[2], users[3]])
})
