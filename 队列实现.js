/**
 * 1. 简单但低效的队列实现
 * https://leetcode-cn.com/explore/learn/card/queue-stack/216/queue-first-in-first-out-data-structure/863/
 */

/**
  * 
    class MyQueue {
        constructor() {
            this.data = [];
            this.p_start = 0;
        }

        enQueue(x) {
            this.data.push(x);
        }

        deQueue(x) {
            if (this.isEmpty()) {
                return false;
            }
            this.p_start++;
        }

        Front() {
            return this.data[this.p_start];
        }

        isEmpty() {
            return this.p_start >= this.data.length;
        }
    }

    {
        const q = new MyQueue();
        q.enQueue(5);
        q.enQueue(3);
        if (!q.isEmpty()) {
            console.log('1', q.Front());
        }
        q.deQueue();
        if (!q.isEmpty()) {
            console.log('2', q.Front());
        }
        q.deQueue();
        if (!q.isEmpty()) {
            console.log('3', q.Front());
        }
    }
  */

/**
 * 2. 设计循环队列
 * https://leetcode-cn.com/explore/learn/card/queue-stack/216/queue-first-in-first-out-data-structure/865/
 * 3. 循环队列实现
 * https://leetcode-cn.com/explore/learn/card/queue-stack/216/queue-first-in-first-out-data-structure/866/
 */

class MyCircularQueue {
  constructor(k) {
    this.k = k;
    this.data = [];
    this.head = -1;
    this.tail = -1;
  }

  enQueue(x) {
    // console.log('head =>', this.head, 'tail =>', this.tail);
    // console.log(this.data);
    if (this.isFull()) {
      return false;
    }
    if (this.isEmpty()) {
      this.head = 0;
    }
    this.tail = (this.tail + 1) % this.k; // key point is % operator.
    this.data[this.tail] = x;
    return true;
  }

  deQueue() {
    // console.log('head =>', this.head, 'tail =>', this.tail);
    // console.log(this.data);
    if (this.isEmpty()) {
      return false;
    }
    this.data[this.head] = null;
    if (this.head === this.tail) { // only one element in queue.
      this.head = -1;
      this.tail = -1;
      return true;
    }
    this.head = (this.head + 1) % this.k;
    return true;
  }

  Front() {
    // console.log('head =>', this.head, 'tail =>', this.tail);
    // console.log(this.data);
    return this.isEmpty() ? -1 : this.data[this.head];
  }

  Rear() {
    // console.log('head =>', this.head, 'tail =>', this.tail);
    // console.log(this.data);
    return this.isEmpty() ? -1 : this.data[this.tail];
  }

  isEmpty() {
    return this.head === -1;
  }

  isFull() {
    return (this.tail + 1) % this.k === this.head;
  }
}

// Test case:
{
  const q = new MyCircularQueue(3);

  console.log("1. enQueue(1) =>", q.enQueue(1)); // 返回 true

  console.log("2. enQueue(2) =>", q.enQueue(2)); // 返回 tclclrue

  console.log("3. enQueue(3) =>", q.enQueue(3)); // 返回 true

  console.log("4. enQueue(4) =>", q.enQueue(4)); // 返回 false，队列已满

  console.log("5-Rear =>", q.Rear()); // 返回 3

  console.log("6. isFull() =>", q.isFull()); // 返回 true

  console.log("7. deQueue() =>", q.deQueue()); // 返回 true

  console.log("8. enQueue(4) =>", q.enQueue(4)); // 返回 true

  console.log("9-Rear =>", q.Rear()); // 返回 4
  console.log("9-Front =>", q.Front()); // 返回 2

  console.log("10. deQueue() =>", q.deQueue()); // 返回 true

  console.log("11. deQueue() =>", q.deQueue()); // 返回 true

  console.log("12. deQueue() =>", q.deQueue()); // 返回 true

  console.log("13. deQueue() =>", q.deQueue()); // 返回 false

  console.log("14-Rear =>", q.Rear()); // -1

  q.enQueue(19)
  q.Front();
}
