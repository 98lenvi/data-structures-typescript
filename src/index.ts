import LinkedListNode from "./linkedListNode";
import { OUT_OF_BOUNDS_ERROR, EMPTY_ERROR } from "./constants";
import { defaultEquals, EqualsFunctions } from "./utils";

interface List<T> {
  head: LinkedListNode<T>;
  tail: LinkedListNode<T>;
  size: number;
}

class LinkedList<T> implements Iterable<T> {
  private list: List<T> | undefined;

  constructor() {
    this.list = undefined;
  }

  size(): number {
    if (this.list) return this.list.size;
    else return 0;
  }

  isEmpty(): boolean {
    if (this.list) return true;
    else return false;
  }

  addFront(val: T): void {
    const newNode = new LinkedListNode(val);

    if (this.list) {
      this.list.head.prev = newNode;
      newNode.next = this.list.head;
      this.list.size += 1;
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1
      };
    }
  }

  addBack(val: T): void {
    const newNode = new LinkedListNode(val);

    if (this.list) {
      this.list.tail.next = newNode;
      newNode.prev = this.list.tail;
      this.list.size += 1;
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1
      };
    }
  }

  addAt(i: number, val: T): void {
    if (i === 0) {
      this.addFront(val);
      return;
    } else if (i === this.size()) {
      this.addBack(val);
      return;
    } else if (i < 0 || i >= this.size() || !this.list) {
      throw new Error(OUT_OF_BOUNDS_ERROR);
    }

    let cur = this.list.head;
    for (let j = 0; j < i - 1; j++) {
      cur = cur.next!;
    }

    const newNode = new LinkedListNode(val);

    cur.next!.prev = newNode;
    newNode.next = cur.next;

    newNode.prev = cur;
    cur.next = newNode;
    this.list.size += 1;
  }

  peekFront(): T {
    if (!this.list) throw new Error(EMPTY_ERROR);

    return this.list.head.val;
  }

  peekBack(): T {
    if (!this.list) throw new Error(EMPTY_ERROR);

    return this.list.tail.val;
  }

  get(i: number): T {
    if (i < 0 || i >= this.size() || !this.list)
      throw new Error(OUT_OF_BOUNDS_ERROR);

    let cur = this.list.head;
    for (let j = 0; j < i; j++) {
      cur = cur.next!;
    }

    return cur.val;
  }

  indexOf(value: T, equalsFunction?: EqualsFunctions<T>): number {
    if (!this.list) return -1;

    const equalsF = equalsFunction || defaultEquals;
    let cur = this.list.head;
    let i;

    for (i = 0; !equalsF(cur.val, value); i++) {
      cur = cur.next!;
    }

    return i;
  }

  contains(value: T, equalsFunction?: EqualsFunctions<T>): boolean {
    const index = this.indexOf(
      value,
      equalsFunction ? equalsFunction : undefined
    );

    return index !== -1;
  }

  removeFront(): T {
    if (!this.list) {
      throw new Error(EMPTY_ERROR);
    } else {
      let secondNode: LinkedListNode<T> = this.list.head.next;
      secondNode.prev = null;
      this.list.head.next = null;
    }
  }
}

export default LinkedList;
