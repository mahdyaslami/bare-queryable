Query on array
==============

bare-queryable help you to query on a array of objects 
as SQL way.

In usual way,  you need to create a callback methods
for Javascript array helpers like filter() and etc.
But here you only do what you need.

Introduction
------------

```javascript
import { query } from 'query'

const users = [
  { id: 1, name: 'bare' },
  { id: 1, name: 'bare' },
]

const result = 
  query(users)
    where('name').contain('re')
    .get()
```

APIs
----

### Select

- #### _get()_

Returns query result.

```javascript
query([...]).get()

```

### Limit

```javascript
query([...]).first()

```

- #### _first()_

Returns first item of query result.

- #### _last()_

Returns last item of query result.

### Where

```javascript
query([...])
  .where('id').equal(1)
  .get()
```

- #### _where(column).equal(value)_

Filters the array so that the specified column is exactly equal to the desired value.

- #### _where(column).above(value)_

Filters the array so that the specified column is greater than the desired value.

- #### _where(column).aboveOrEqual(value)_

Filters the array so that the specified column is greater than or equal to the desired value.

- #### _where(column).below(value)_

Filters the array so that the specified column is lower than the desired value.

- #### _where(column).belowOrEqual(value)_

Filters the array so that the specified column is lower than or equal to the desired value.

- #### _where(column).contain(value)_

Filters the array so that the specified column is contain the desired value.

- #### _where(column).in(array)_

Filters the array so that the specified column is inside the desired array.

```javascript
query([...])
  .where('id').in([1, 2, 3])
  .get()
```

- #### _andWhere(column)_

Chain conditions with `and` operator. both ways are ok.

```javascript
query([...])
  .where('id').equal(1)
  .andWhere('name').contain('foo')
  .get()

query([...])
  .where('id').equal(1)
  .where('name').contain('foo')
  .get()
```

- #### _orWhere(column)_

Chain conditions with `or` operator.

```javascript
query([...])
  .where('id').equal(1)
  .orWhere('id').above(10)
  .get()
```