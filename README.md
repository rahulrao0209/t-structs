![DS-TS](./public/ds-ts-cover.png)

# DS-TS

**DS-TS** is a _TypeScript_ library consisting of _standard data structures_ provided through a simple API.

## Getting Started

## Installation

```bash
npm install ds-ts
```

## API and Usage

<details>
  <summary style="font-size:24px">
    List
  </summary>

  <details>
    <summary style="font-size:18px">
      Singly Linked List
    </summary>

  <details>
    <summary style="font-size:16px">
      Accessors
    </summary>

    - **isEmpty** (read-only)

---

get isEmpty() : _boolean_

---

**_Returns_** _boolean_ - indicating whether the list is empty.
<br />
<br />

- **head** (read-only)

---

get head(): _ListNode<T> | null_

---

**_Returns_** _ListNode<T> | null_ - returns the head of the linked-list or null if the list has no head, which means that the list is empty.
<br />
<br />

- **tail** (read-only)

---

get tail(): _ListNode<T> | null_

---

**_Returns_** _ListNode<T> | null -_ the tail of the linked-list or null if the list has no tail, which means that the list is empty.
<br />
<br />

- **length** (read-only)
  </details>

get length(): _number_

---

**_Returns_** _number_ - an integer value indicating the length of the linked-list.

### **Methods**

---

<br />

- **push**

---

push(value, …rest): _SinglyLinkedList<T>_

---

Appends item(s)/node(s) to the linked-list. (Accepts multiple values)

**_Parameters_**

- value: T

       The value of the ListNode<T>

- …rest: T[]

       If multiple values are being passed.

**_Returns_** _SinglyLinkedList<T>_

the updated list.
<br />
<br />

- **pushAll**

---

pushAll(values): _SinglyLinkedList<T>_

---

Appends multiple items/nodes to the linked-list (Accepts an array of values of type T)

**_Parameters_**

- values: T[]

      List of values to be appended in the list

**Returns** _SinglyLinkedList<T>_

the updated list.

- **pop**

---

pop(): _ListNode<T> | undefined_

---

Removes the last node from the list and returns it.

**Returns** _ListNode<T> | undefined_

the last node in the list.
<br />
<br />

- **shift**

---

shift(): _ListNode<T> | undefined_

---

Removes the first/beginning node in the list and returns it.

**Returns** _ListNode<T> | undefined_

the first node in the list.
<br/>
<br/>

- **unshift**

---

unshift(value): *SinglyLinkedList<T>*

---

Adds an item/node to the beginning of the list.

**_Parameters_**

- value: *T*
  The value of the node to be added.

**_Returns_** _SinglyLinkedList_<_T_>

the updated list.
<br/>
<br/>

- **get**

---

get(index):  *ListNode*<_T_> | _undefined_

---

Get the node at the given index.

**_Parameters_**

- index: *number*
  The index of the node which is to be returned.

**_Returns_** *ListNode*<_T_> | _undefined_

the node at the given index or undefined if the index is invalid.
<br/>
<br/>

- **set**

---

set(index, value): *boolean*

---

Updates the value of the node at a given index with the new value.

**_Parameters_**

- index: number

      The index of the node which is to be updated.

- value: T

       The value with which the node is to be updated.

**Returns** boolean

indicating whether the operation succeeded or not.
<br/>
<br/>

- **has**

---

has(element): *boolean*

---

Check whether an element/value exists in the list.

**_Parameters_**

- element: T

      The value of the node which is to be searched for.

**Returns** boolean

indicating whether the node with the given value exists or not.
<br/>
<br/>

- **insert**

---

insert(value, index): *boolean*

---

Inserts a node at the given index.

**Parameters**

- value: *T*
  the value of the node to be inserted.
- index: *number*
  the index at which the new node is to be inserted.

**_Returns_** *boolean*

representing whether the insertion succeeded or not.
<br/>
<br/>

- **remove**

---

remove(index): *undefined* | *ListNode*<_T_>

---

Removes a node at the given index.

**Parameters**

- index: *number*
  the index at which the node is to be removed.

**_Returns_** *ListNode*<_T_> | _undefined_

the removed node or undefined if the index is invalid.
<br/>
<br/>

- **reverse**

---

reverse(): *SinglyLinkedList*<_T_>

---

Reverses the list.

**_Returns_** *SinglyLinkedList*<_T_>

the reversed list
<br/>
<br/>

- **delete**

---

delete(): *boolean*

---

Deletes the linked list.

**_Returns_** *boolean*

whether the list was deleted or not.
<br/>
<br/>

- toArray

---

toArray(): *T*[]

---

Returns an array containing all the list node values.

**_Returns_** *T*[]

an array containing all the list node values.
<br/>
<br/>

</details>
</details>
_A library consisting of standard data structures implemented using TypeScript._

Note - This library is a work in progress.
