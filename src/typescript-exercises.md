# Typescript Exercises

> typescript exercises를 풀며 타입 에러가 왜 발생했는지 이해하고, 어떻게 해결할 수 있는지를 정리했습니다.
> [https://typescript-exercises.github.io](https://typescript-exercises.github.io/#exercise=10&file=%2Findex.ts)

```
Rules and principles:

1. Avoid using "any" type at all costs.
2. Difficulty quickly grows one exercise after another.
3. Feel free to send pull-requests if you've come up
   with improvements!
4. Provide feedback to the creator of these exercises.
5. Enjoy.
```

## 목차

1. [objects](#1-objects)
2. [types from types](#types-from-types)
3. [in operator type narrowing](#in-operator-type-narrowing)
4. [type predicates](#type-predicates)
5. [utility type](#utility-type)
6. [function overloads](#function-overloads)
7. [generics](#generics)
8. [uitility type](#uitility-type)
9. [generics](#generics)

---

## 1. objects

### problem:

```typescript
export type User = unknown;

export const users: unknown[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
];

export function logPerson(user: unknown) {
  console.log(` - ${user.name}, ${user.age}`); // Object is of type 'unknown'.
}

console.log('Users:');
users.forEach(logPerson);
```

logPerson함수의 매개변수인 user의 타입이 unknown이기 때문에 user의 name, age 프로퍼티에 접근하려는 부분에서 에러가 발생했다.

### solution:

```typescript
export type User = {
  name: string;
  age: number;
  occupation: string;
};

export const users: User[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
];

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}

console.log('Users:');
users.forEach(logPerson);
```

함수에 전달하는 데이터인 users 배열의 원소인 object의 타입을 User 타입으로 정의한다. users 배열의 선언 부분과 함수의 매개변수의 타입을 정의하는 부분에 타입을 명확하게 지정해줘야 한다.(type assertion)

## 2. types from types

### problem:

```typescript
interface User {
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  name: string;
  age: number;
  role: string;
}

export type Person = unknown;

export const persons: User[] /* <- Person[] */ = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator', //'{ name: string; age: number; role: string; }' is not assignable to type 'User'. Object literal may only specify known properties, and 'role' does not exist in type 'User'.
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver', //'{ name: string; age: number; role: string; }' is not assignable to type 'User'. Object literal may only specify known properties, and 'role' does not exist in type 'User'.
  },
];

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson);
```

persons배열의 타입을 User타입의 객체를 원소로 가진 배열로 지정하고 있다. role 프로퍼티를 가진 Admin 타입의 객체를 persons 배열에 넣었기 때문에 에러가 발생했다.

### solution:

```typescript
export type Person = User | Admin;

export const persons: Person[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
];

export function logPerson(user: Person) {
  console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson);
```

문제에서 힌트를 준 것 처럼 Person 타입을 지정해서 사용하면 된다. Person 타입을 User 타입 또는 Admin 타입으로 정의하는 유니온 타입으로 만들고 persons 배열의 타입을 Person타입의 객체를 원소로하는 배열로 선언해주도록 수정해서 에러를 해결한다. logPerson의 매개변수 타입도 Person으로 수정한다.

## 3. in operator type narrowing

### problem:

```typescript
interface User {
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
];

export function logPerson(person: Person) {
  let additionalInformation: string;
  if (person.role) {
    // **error!**
    additionalInformation = person.role; // **error!**
  } else {
    additionalInformation = person.occupation; //**error! Property 'occupation' does not exist on type 'Admin'**
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

persons.forEach(logPerson);
```

logPerson 함수는 Person 타입을 인자로 받아, Admin 타입인 경우에는 role 프로퍼티에 접근하고 User 타입인 경우에는 occupation 프로퍼티에 접근하려고 한다. Admin과 User타입의 공통적인 프로퍼티(name, age)에는 접근할 수 있지만 role, occupation프로퍼티는 각각의 타입(User, Admin)이 확정되기 전에는 접근할 수 없기 때문에 발생한 에러이다.

### solution:

```typescript
export function logPerson(person: Person) {
  let additionalInformation: string;
  if ('role' in person) {
    additionalInformation = person.role;
  } else {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
```

if문이 수행해야하는 역할은 전달인자가 role 프로퍼티를를 가지고 있는지 여부를 판별해야하는 것이다.'role' in person의 조건이 참이면, 해당 블록 내에서 person 객체는 Admin 타입으로 좁혀지기 때문에 role 프로퍼티에 접근할 수 있게된다.

- keyword: [the in operator narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing), [mdn- in operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/in)

![Untitled](%60Typescript%20Exercises%20b9a0bdaa87f1463cabca3980a95dc62a/Untitled.png)

객체가 특정 프로퍼티를 가지고 있는지 확인하는 다른 방법인 `hasOwnProperty()`는 type narrowing을 수행하지 않는다.

![Untitled](%60Typescript%20Exercises%20b9a0bdaa87f1463cabca3980a95dc62a/Untitled%201.png)

## 4. type predicates

### problem:

```typescript
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  {
    type: 'user',
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
];

export function isAdmin(person: Person) {
  return person.type === 'admin';
}

export function isUser(person: Person) {
  return person.type === 'user';
}

export function logPerson(person: Person) {
  let additionalInformation: string = '';
  if (isAdmin(person)) {
    additionalInformation = person.role; // Property 'role' does not exist on type 'Person'. Property 'role' does not exist on type 'User'
  }
  if (isUser(person)) {
    additionalInformation = person.occupation; //Property 'occupation' does not exist on type 'Person'. Property 'occupation' does not exist on type 'Admin'.
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);
```

isAdmin, isUser 함수를 통해서 person객체의 type이 좁혀지지 않기 때문에 role, occupation에 접근할 수 없어서 발생한 에러이다.

### solution:

```typescript
export function logPerson(person: Person) {
  let additionalInformation: string = '';
  if (person.type === 'admin') {
    additionalInformation = person.role; // (parameter) person: Admin
  } else {
    additionalInformation = person.occupation; //(parameter) person: User
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
```

이런 식으로 직접 사용할때는 타입을 좁힐 수 있지만 해당 로직을 함수로 감싸면 타입을 좁힐 수 없다. 타입스크립트는 isAdmin과 isUser가 boolean 값을 리턴한다는 사실만 알고 인수의 타입을 좁히기 위해 사용한다는 것은 알 수 없기 때문이다.

```typescript
export function isAdmin(person: Person): person is Admin {
  return person.type === 'admin';
}

export function isUser(person: Person): person is User {
  return person.type === 'user';
}

export function logPerson(person: Person) {
  let additionalInformation: string = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
```

isAdmin과 isUser 함수가 타입가드의 역할을 할 수 있도록 해야한다. 함수가 리턴하는 타입이 매개변수의 타입보다 더 구체적인 타입인지 여부를 나타내도록 할때 사용하는 type predicates 구문을 사용한다.

- `function typePredicate(input: WideType) : input is NarrowType;`

- keyword: [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates), user-defined type guard

## 5. utility type

### problem:

```typescript
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  {
    type: 'user',
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    type: 'admin',
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    type: 'user',
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    type: 'admin',
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
  {
    type: 'user',
    name: 'Wilson',
    age: 23,
    occupation: 'Ball',
  },
  {
    type: 'admin',
    name: 'Agent Smith',
    age: 23,
    role: 'Administrator',
  },
];

export const isAdmin = (person: Person): person is Admin =>
  person.type === 'admin';
export const isUser = (person: Person): person is User =>
  person.type === 'user';

export function logPerson(person: Person) {
  let additionalInformation = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

export function filterUsers(persons: Person[], criteria: User): User[] {
  return persons.filter(isUser).filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof User)[];
    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}

console.log('Users of age 23:');

filterUsers(persons, {
  age: 23, // Argument of type '{ age: number; }' is not assignable to parameter of type 'User'. Type '{ age: number; }' is missing the following properties from type 'User': type, name, occupation
}).forEach(logPerson);
```

filterUsers 함수의 criteria 매개변수가 User 타입을 따르지 않는 객체를 전달받았기 때문에 발생한 에러이다.

### solution:

```typescript
export function filterUsers(
  persons: Person[],
  criteria: Partial<Omit<User, 'type'>>
): User[] {
  return persons.filter(isUser).filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof Omit<User, 'type'>)[];
    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}
```

문제의 요구 조건은 criteria로 User타입의 type 프로퍼티를 제외한 일부의 프로퍼티만을 가진 객체를 전달할 수 있도록 함수의 매개변수 타입을 수정하는 것이다. 타입을 새로 정의하지 않고 유틸리티 타입을 이용해서 기존 User 타입을 활용해 수정할 수 있다. ‘type’ 프로퍼티를 제외한 타입을 만들기 위해서 `Omit<Type, key>`을 사용하고, 모든 프로퍼티를 optional하게 만들기 위해서 `Partial<Type>`를 사용한다.

## 6. function overloads

### problem:

```typescript
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  {
    type: 'user',
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
  { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
  { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' },
];

export function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === 'admin' ? person.role : person.occupation
    }`
  );
}

export function filterPersons(
  persons: Person[],
  personType: string,
  criteria: unknown
): unknown[] {
  return persons
    .filter((person) => person.type === personType)
    .filter((person) => {
      let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
      return criteriaKeys.every((fieldName) => {
        return person[fieldName] === criteria[fieldName]; // Object is of type 'unknown'
      });
    });
}

export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 }); // unknown[]
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 }); //unknown[]

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson); //Argument of type '(person: Person) => void' is not assignable to parameter of type '(value: unknown, index: number, array: unknown[]) => void'.

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson); //Argument of type '(person: Person) => void' is not assignable to parameter of type '(value: unknown, index: number, array: unknown[]) => void'.
```

filterPersons 함수의 criteria 매개변수가 unknown 타입이기 때문에 해당 매개변수의 property 이름과 값을 person 객체와 비교할때 타입 검사를 수행할 수 없어서 에러가 발생했다.

### solution:

```typescript
export function filterPersons(
  persons: Person[],
  personType: User['type'],
  criteria: Partial<Omit<User, 'type'>>
): User[];
export function filterPersons(
  persons: Person[],
  personType: Admin['type'],
  criteria: Partial<Omit<Admin, 'type'>>
): Admin[];
export function filterPersons(
  persons: Person[],
  personType: Person['type'],
  criteria: Partial<Omit<Person, 'type'>>
): Person[] {
  return persons
    .filter((person) => person.type === personType)
    .filter((person) => {
      let criteriaKeys = Object.keys(criteria) as (keyof Omit<
        Person,
        'type'
      >)[];
      return criteriaKeys.every((fieldName) => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}
```

문제의 조건은 filterPersons 함수가 전달받은 personType에 따라서 ‘user’일 때는 User[]를 리턴하고, ‘admin’일때는 Admin[]을 리턴하도록 수정하는 것이다. filterPersons 함수는 personType에 따라 부분 User/Admin 타입을 받아들일 수 있어야하고. criteria 인자는 personType인자 값에 따라서 동작해야 한다.

[function overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)를 사용해서 함수를 호출할때 전달하는 인수의 유형에 따라 다른 리턴값을 갖도록 정의할 수 있다. 하나의 최종 구현 시그니처와 함수 본문 앞에 서로 다른 버전의 함수 이름, 매개변수, 리턴 타입을 여러번 선언한다.

함수 선언부분 위에 personType이 user일 경우와 admin일 경우의 매개변수, 리턴 타입을 각각 선언한다.

```typescript
export function getObjectKeys<T>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export function filterPersons(
  persons: Person[],
  personType: User['type'],
  criteria: Partial<Omit<User, 'type'>>
): User[];
export function filterPersons(
  persons: Person[],
  personType: Admin['type'],
  criteria: Partial<Omit<Admin, 'type'>>
): Admin[];
export function filterPersons(
  persons: Person[],
  personType: Person['type'],
  criteria: Partial<Omit<Person, 'type'>>
): Person[] {
  return persons
    .filter((person) => person.type === personType)
    .filter((person) => {
      let criteriaKeys = getObjectKeys(criteria);
      return criteriaKeys.every((fieldName) => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}
```

getObjectKeys()함수를 구현해서 어떤 전달인자가 주어지든 결과를 반환하도록 개선해보라는 보너스 미션이 있었다. 이부분은 제네릭을 사용해서 해결할 수 있다. getObjectKeys()함수는 전달받은 obj 객체의 key타입을 원소로 갖는 배열을 리턴한다.

## 7. generics

### problem:

```typescript
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

function logUser(user: User) {
  const pos = users.indexOf(user) + 1;
  console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
}

function logAdmin(admin: Admin) {
  const pos = admins.indexOf(admin) + 1;
  console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`);
}

const admins: Admin[] = [
  {
    type: 'admin',
    name: 'Will Bruces',
    age: 30,
    role: 'Overseer',
  },
  {
    type: 'admin',
    name: 'Steve',
    age: 40,
    role: 'Steve',
  },
];

const users: User[] = [
  {
    type: 'user',
    name: 'Moses',
    age: 70,
    occupation: 'Desert guide',
  },
  {
    type: 'user',
    name: 'Superman',
    age: 28,
    occupation: 'Ordinary person',
  },
];

export function swap(v1, v2) {
  return [v2, v1]; // Parameter 'v1' implicitly has an 'any' type. Parameter 'v2' implicitly has an 'any' type.
}

function test1() {
  console.log('test1:');
  const [secondUser, firstAdmin] = swap(admins[0], users[1]);
  logUser(secondUser);
  logAdmin(firstAdmin);
}

function test2() {
  console.log('test2:');
  const [secondAdmin, firstUser] = swap(users[0], admins[1]);
  logAdmin(secondAdmin);
  logUser(firstUser);
}

function test3() {
  console.log('test3:');
  const [secondUser, firstUser] = swap(users[0], users[1]);
  logUser(secondUser);
  logUser(firstUser);
}

function test4() {
  console.log('test4:');
  const [firstAdmin, secondAdmin] = swap(admins[1], admins[0]);
  logAdmin(firstAdmin);
  logAdmin(secondAdmin);
}

function test5() {
  console.log('test5:');
  const [stringValue, numericValue] = swap(123, 'Hello World');
  console.log(` - String: ${stringValue}`);
  console.log(` - Numeric: ${numericValue}`);
}

[test1, test2, test3, test4, test5].forEach((test) => test());
```

swap함수의 매개변수의 타입이 정해지지 않아서 발생한 에러이다.

### solution:

```typescript
export function swap<T1, T2>(v1: T1, v2: T2): [T2, T1] {
  return [v2, v1];
}
```

매개변수에 특정한 타입을 지정하면 아래의 다양한 case를 해결할 수 없기 때문에 generic을 사용한다. swap 함수를 호출할때의 인자의 타입에 맞게 리턴할 수 있다. 리턴 타입을 정확히 지정하지 않으면 타입스크립트는 리턴할 배열의 원소를 유니언 타입으로 유추하기 때문에 리턴타입을 지정해줘야 한다.

![Untitled](%60Typescript%20Exercises%20b9a0bdaa87f1463cabca3980a95dc62a/Untitled%202.png)

## 8. uitility type

### problem:

```typescript
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

type PowerUser = unknown;

export type Person = User | Admin | PowerUser; // unknown

export const persons: Person[] = [
  {
    type: 'user',
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
  {
    type: 'powerUser',
    name: 'Nikki Stone',
    age: 45,
    role: 'Moderator',
    occupation: 'Cat groomer',
  },
];

function isAdmin(person: Person): person is Admin {
  return person.type === 'admin'; //Object is of type 'unknown'.
}

function isUser(person: Person): person is User {
  return person.type === 'user'; //Object is of type 'unknown'.
}

function isPowerUser(person: Person): person is PowerUser {
  return person.type === 'powerUser'; //Object is of type 'unknown'.
}

export function logPerson(person: Person) {
  let additionalInformation: string = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  if (isPowerUser(person)) {
    additionalInformation = `${person.role}, ${person.occupation}`; //Object is of type 'unknown'.
  }
  console.log(`${person.name}, ${person.age}, ${additionalInformation}`); //Object is of type 'unknown'.
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);

console.log();

console.log('Power users:');
persons.filter(isPowerUser).forEach(logPerson);
```

powerUser은 unknown 타입이기 때문에, 이를 사용한 Person 타입 또한 unknown 타입이다. (User타입, Admin타입, unknown의 합집합은 unknown이기 때문) 따라서 Person 타입(unknown)으로 지정된 객체의 프로퍼티에 접근할 수 없기 때문에 에러가 발생한 것이다.

### solution:

```typescript
type PowerUser = Omit<User, 'type'> &
  Omit<Admin, 'type'> & { type: 'powerUser' };
```

PowerUser 타입은 type프로퍼티를 제외한 User와 Admin의 모든 프로퍼티를 가지고 있으면서 type 프로퍼티는 ‘powerUser’라는 리터럴 타입을 가지고 있어야 한다. User와 Admin 타입을 활용해서 타입을 정의하기 위해서 intersection types(`&`)을 사용한다.

## 9. generics

### problem:

```typescript
/*
Exercise:

    Remove UsersApiResponse and AdminsApiResponse types
    and use generic type ApiResponse in order to specify API
    response formats for each of the functions.

*/

interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

type Person = User | Admin;

const admins: Admin[] = [
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
];

const users: User[] = [
  {
    type: 'user',
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
];

export type ApiResponse<T> = unknown;

type AdminsApiResponse =
  | {
      status: 'success';
      data: Admin[];
    }
  | {
      status: 'error';
      error: string;
    };

export function requestAdmins(callback: (response: AdminsApiResponse) => void) {
  callback({
    status: 'success',
    data: admins,
  });
}

type UsersApiResponse =
  | {
      status: 'success';
      data: User[];
    }
  | {
      status: 'error';
      error: string;
    };

export function requestUsers(callback: (response: UsersApiResponse) => void) {
  callback({
    status: 'success',
    data: users,
  });
}

export function requestCurrentServerTime(
  callback: (response: unknown) => void
) {
  callback({
    status: 'success',
    data: Date.now(),
  });
}

export function requestCoffeeMachineQueueLength(
  callback: (response: unknown) => void
) {
  callback({
    status: 'error',
    error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.',
  });
}

function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === 'admin' ? person.role : person.occupation
    }`
  );
}

function startTheApp(callback: (error: Error | null) => void) {
  requestAdmins((adminsResponse) => {
    console.log('Admins:');
    if (adminsResponse.status === 'success') {
      adminsResponse.data.forEach(logPerson);
    } else {
      return callback(new Error(adminsResponse.error));
    }

    console.log();

    requestUsers((usersResponse) => {
      console.log('Users:');
      if (usersResponse.status === 'success') {
        usersResponse.data.forEach(logPerson);
      } else {
        return callback(new Error(usersResponse.error));
      }

      console.log();

      requestCurrentServerTime((serverTimeResponse) => {
        console.log('Server time:');
        if (serverTimeResponse.status === 'success') {
          //Object is of type 'unknown'.
          console.log(
            `   ${new Date(serverTimeResponse.data).toLocaleString()}`
          ); //Object is of type 'unknown'.
        } else {
          return callback(new Error(serverTimeResponse.error)); //Object is of type 'unknown'.
        }

        console.log();

        requestCoffeeMachineQueueLength((coffeeMachineQueueLengthResponse) => {
          console.log('Coffee machine queue length:');
          if (coffeeMachineQueueLengthResponse.status === 'success') {
            //Object is of type 'unknown'.
            console.log(`   ${coffeeMachineQueueLengthResponse.data}`); //Object is of type 'unknown'.
          } else {
            return callback(new Error(coffeeMachineQueueLengthResponse.error)); //Object is of type 'unknown'.
          }

          callback(null);
        });
      });
    });
  });
}

startTheApp((e: Error | null) => {
  console.log();
  if (e) {
    console.log(
      `Error: "${e.message}", but it's fine, sometimes errors are inevitable.`
    );
  } else {
    console.log('Success!');
  }
});
```

requestUsers, requestCurrentServerTime, requestCoffeeMachineQueueLength 함수의 콜백 매개변수가 unknown 타입으로 지정되어서 객체의 프로퍼티에 접근할 수 없어서 오류가 발생했다.

### solution:

```typescript
export type ApiResponse<T> =
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      error: string;
    };

export function requestAdmins(
  callback: (response: ApiResponse<Admin[]>) => void
) {
  callback({
    status: 'success',
    data: admins,
  });
}

export function requestUsers(
  callback: (response: ApiResponse<User[]>) => void
) {
  callback({
    status: 'success',
    data: users,
  });
}

export function requestCurrentServerTime(
  callback: (response: ApiResponse<number>) => void
) {
  callback({
    status: 'success',
    data: Date.now(),
  });
}

export function requestCoffeeMachineQueueLength(
  callback: (response: ApiResponse<number>) => void
) {
  callback({
    status: 'error',
    error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.',
  });
}
```

AdminsApiResponse, UsersApiResponse를 삭제하고 ApiResponse를 제네릭 타입으로 변경한다. 콜백함수 매개변수를 ApiResponse 타입을 사용하도록 수정한다.
