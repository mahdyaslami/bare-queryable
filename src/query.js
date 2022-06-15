import { on } from './join.js'
import where from './where.js'
import orderBy from './order-by.js'
import { NUMBER_COMPARATOR } from './comparators.js'
import {
    users, parents,
} from './fake.js'

function query(array) {
    return {
        _rows: array,
        _joinCallback: null,
        _filterCallback: null,
        _limitCallback: null,
        _orderByCallback: null,

        get() {
            return this.call()
        },

        first() {
            this._limitCallback = (rows) => rows[0]

            return this.call()
        },

        last() {
            this._limitCallback = (rows) => rows[rows.length - 1]

            return this.call()
        },

        count() {
            this._limitCallback = (rows) => rows.length

            return this.call()
        },

        call() {
            return this._prepareResult(this._rows)
        },

        _prepareResult(rows) {
            let result = this._join(rows)

            result = this._filter(result)

            result = this._orderBy(result)

            return this._limit(result)
        },

        _join(rows) {
            if (this._joinCallback) {
                return rows.reduce(this._joinCallback, [])
            }

            return rows
        },

        _filter(rows) {
            if (this._filterCallback) {
                return rows.filter(this._filterCallback)
            }

            return rows
        },

        _orderBy(rows) {
            if (this._orderByCallback) {
                return rows.slice(0).sort(this._orderByCallback)
            }

            return rows
        },

        _limit(rows) {
            if (this._limitCallback) {
                return this._limitCallback(rows)
            }

            return rows
        },

        crossJoin(rightRows) {
            return this._prepareJoin(rightRows, {
                call() {
                    return true
                },
            }, false, this)
        },

        innerJoin(rightRows) {
            return this.join(rightRows)
        },

        join(rightRows) {
            return this._prepareJoin(rightRows, on(this))
        },

        leftJoin(rightRows) {
            return this._prepareJoin(rightRows, on(this), true)
        },

        rightJoin() {
            this._joinCallback = () => [
                { ...users[0], ...parents[0] },
                { ...users[1], ...parents[0] },
                { ...users[2], ...parents[1] },
                { ...parents[2] },
            ]

            return on(this)
        },

        _prepareJoin(rightRows, onExpression, leftJoin = false, returnValue = onExpression) {
            this._joinCallback = (previous, leftRow) => {
                let holdLeftRow = leftJoin

                rightRows.forEach((rightRow) => {
                    if (onExpression.call(leftRow, rightRow)) {
                        previous.push({
                            ...leftRow,
                            ...rightRow,
                        })

                        holdLeftRow = false
                    }
                })

                if (holdLeftRow) {
                    previous.push({
                        ...leftRow,
                    })
                }

                return previous
            }

            return returnValue
        },

        where(column) {
            const whereExpression = where(column, this)

            if (this._filterCallback) {
                this._and(whereExpression)
            } else {
                this._filterCallback = (row) => whereExpression.call(row)
            }

            return whereExpression
        },

        andWhere(column) {
            const whereExpression = where(column, this)

            this._and(whereExpression)

            return whereExpression
        },

        _and(whereExpression) {
            const previousCallback = this._filterCallback

            this._filterCallback = (row) => previousCallback(row) && whereExpression.call(row)
        },

        orWhere(column) {
            const whereExpression = where(column, this)

            this._or(whereExpression)

            return whereExpression
        },

        _or(whereExpression) {
            const previousCallback = this._filterCallback

            this._filterCallback = (row) => previousCallback(row) || whereExpression.call(row)
        },

        orderBy(column, comparator = NUMBER_COMPARATOR) {
            const orderByExpression = orderBy(column, comparator, this)

            if (this._orderByCallback) {
                this._chainOrderByExpressions(orderByExpression)
            } else {
                this._orderByCallback = (a, b) => orderByExpression.call(a, b)
            }

            return orderByExpression
        },

        _chainOrderByExpressions(orderByExpression) {
            const previousCallback = this._orderByCallback

            this._orderByCallback = (a, b) => {
                const previousCallbackResult = previousCallback(a, b)

                if (previousCallbackResult === 0) {
                    return orderByExpression.call(a, b)
                }

                return previousCallbackResult
            }
        },
    }
}

export default query
