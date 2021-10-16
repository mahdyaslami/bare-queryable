import where from './where.js'

function query(array) {
    return {
        _data: array,
        _filterCallback: null,

        get() {
            return this.prepareResult(data => data)
        },

        first() {
            return this.prepareResult(data => data[0])
        },

        last() {
            return this.prepareResult(data => data[data.length - 1])
        },

        prepareResult(callback) {
            return callback(
                this.filter(this._data)
            )
        },

        filter(data) {
            if (this._filterCallback) {
                return data.filter(this._filterCallback)
            }

            return data
        },

        where(column) {
            const whereClause = where(column, this)

            this._filterCallback = (row) => whereClause.call(row)

            return whereClause
        },

        andWhere(column) {
            const whereClause = where(column, this)

            this.and(whereClause)

            return whereClause
        },

        and(whereClause) {
            const first = this._filterCallback

            this._filterCallback = (row) => first(row) && whereClause.call(row)
        },

        orWhere(column) {
            const whereClause = where(column, this)

            this.or(whereClause)

            return whereClause
        },

        or(whereClause) {
            const first = this._filterCallback

            this._filterCallback = (row) => first(row) || whereClause.call(row)
        },
    }
}

export default query
