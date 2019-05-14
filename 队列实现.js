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
    this.head = null;
    this.tail = null;
  }

  enQueue(x) {
		console.log(this.data)
    if (this.isFull()) {
      return false;
    } else {
			if (this.head === null && this.tail === null) {
				// first time enQueue.
				this.head = 0;
				this.tail = 0;
				this.data.push(x);
			} else {
				if (this.head !== 0) {
					// if head has moved in next position.
					if (this.tail < this.k - 1) {
						this.data.splice(this.tail, 0, x);
					} else {
						const insertIndex = this.k - 1 - this.tail
						this.data.splice(insertIndex, 0, x);
						this.tail = insertIndex;
					}
				} else {
					// if head just in original position - zero.
					this.data.push(x);
					this.tail += 1;
				}	
			}
			return true;
    }
  }

  deQueue() {
		console.log(this.data)
		if (this.isEmpty()) {
			return false;
		} else {
			this.data.splice(this.head, 1);
			(this.head < this.k - 1) ? this.head += 1 : this.head = 0;
			return true;
		}
  }

  Front() {
		console.log(this.data)
		this.checkDataLenLimit()
		return this.isEmpty() ? -1 : this.data[this.head];
  }

  Rear() {
		console.log(this.data)
		this.checkDataLenLimit()
		return this.isEmpty() ? -1 : this.data[this.tail];
  }

  isEmpty() {
		return this.data.length === 0;
  }

  isFull() {
		return this.data.length === this.k;
	}

	checkDataLenLimit() {
		if (this.data.length === 1) {
			this.head = 0;
			this.tail = 0;	
		}
	}

	resetData() {
		this.head = null;
		this.tail = null;
		this.data = [];
	}
}

// Test case 1:
{
  const q = new MyCircularQueue(3);

  console.log("1 =>", q.enQueue(1)); // 返回 true

  console.log("2 =>", q.enQueue(2)); // 返回 tclclrue

  console.log("3 =>", q.enQueue(3)); // 返回 true

  console.log("4 =>", q.enQueue(4)); // 返回 false，队列已满

  console.log("5-Rear =>", q.Rear()); // 返回 3

  console.log("6 =>", q.isFull()); // 返回 true

  console.log("7 =>", q.deQueue()); // 返回 true

	console.log("8 =>", q.enQueue(4)); // 返回 true
	
	console.log("9-Rear =>", q.Rear()); // 返回 4
	console.log("9-Front =>", q.Front()); // 返回 2
	
	console.log("10 =>", q.deQueue()); // 返回 true

	console.log("11 =>", q.deQueue()); // 返回 true

	console.log("12 =>", q.deQueue()); // 返回 true

	console.log("13 =>", q.deQueue()); // 返回 false

	console.log("14-Rear =>", q.Rear()); // -1

	q.enQueue(10);
	q.enQueue(12);
	q.enQueue(13);

	console.log(q.Rear()); // 13

}

// Test case 2:
// {
// 	const circularQueue = new MyCircularQueue(6); // 设置长度为 6

// 	console.log("1 =>", circularQueue.enQueue(6)); // true
	
// 	console.log("2 =>", circularQueue.Rear()); // 6

// 	console.log("3 =>", circularQueue.Rear()); // 6
	
// 	console.log("4 =>", circularQueue.deQueue()); // true
	
// 	console.log("5 =>", circularQueue.enQueue(5)); // true
	
// 	console.log("6 =>", circularQueue.Rear()); // 5
	
// 	console.log("7 =>", circularQueue.deQueue()); // true
	
// 	console.log("8 =>", circularQueue.Front()); // -1
	
// 	console.log("9 =>", circularQueue.deQueue()); // false

// 	console.log("10 =>", circularQueue.deQueue()); // false

// 	console.log("11 =>", circularQueue.deQueue()); // false
// }

// Test case 3:
// {
// 	const circularQueue = new MyCircularQueue(81); // 设置长度为 81

// 	console.log("1 =>", circularQueue.enQueue(92)); // true

// 	console.log("2 =>", circularQueue.enQueue(12)); // true

// 	console.log("3 =>", circularQueue.deQueue()); // true
	
// 	console.log("4 =>", circularQueue.Front()); // 12

// 	console.log("5 =>", circularQueue.deQueue()); // true

// 	console.log("6 =>", circularQueue.enQueue(28)); // true

// 	console.log("7 =>", circularQueue.Front()); // 28

// 	console.log("8 =>", circularQueue.enQueue(13)); // true

// 	console.log("9 =>", circularQueue.enQueue(45)); // true
// }
