# Relations

## One to One 

- 1 User - 1 Account
- 1 Order - 1 Delivery Address 

One item has exactly one related other item.

Often NESTING the data in the parent is used

Order:
{
  _id: "12345",
  customer: "Robert Ristock",
  deliveryAddress: {
    street: "Sesame Street",
    nr: 17,
    zipcode: "D-12345"
  }
}

### One to Few

One item has LIMITED related (child) items.

Often NESTING the data in the parent is used.

For example social media profile links:

{
  "user": {
    "name": "robbos",
    "social-media": [
      { "platform": "facebook", "link": "https://facebook.com/robbos"  }
      { "platform": "twitter", "link": "https://twitter.com/robbos"  }
      { "platform": "instagram", "link": "https://instagram.com/robbos"  }
    ]
  }
}


### One to Many

One to Many: One item can have many, potentially UNLIMITED related items of another one.

Technique: Reference items by ID

Example: 1 User can have as many todos as he / she likes.

User:
{
  "user": {
    "_id": "u1"
    "name": "robbos",
    "todos": [ "t1", "t2", "t3", "t4", "t5 ],
  }
}

Todos:
[
  { _id: "t1", title: "Wake the dog", userId: "u1" },
  { _id: "t2", title: "Clean the dishes", userId: "u1" },
  { _id: "t3", title: "Learn Python", userId: "u1" },
  { _id: "t5", title: "Learn Relations", userId: "u1" },
]

Beispiel Mongoose: 
```
 todos: [ { type: mongoose.Types.ObjectId, ref: "Todo" } ]
```


## Many to Many

Many to Many: One Item A can have MANY of the other item B AND one item B can have many items of A

Technique: Reference items by ID

Examples:
- Book and Authors => one book can be written by many authors. One author can write many books
- Product Customer => one Product can be bought by MANY customers. One customer can buy MANY products
- Employee Project => one Employee can be in many projects. One projects can have many employees
- User Todos => one user can have many todos. One todo can be shared by many users

Beispiel Mongoose: 
```
 Employee Model:
 projects: [ { type: mongoose.Types.ObjectId, ref: "Project" } ]

 Project Model:
 employees: [ { type: mongoose.Types.ObjectId, ref: "Employee" }]
```

