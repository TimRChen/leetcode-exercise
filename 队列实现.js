
/**
 * https://leetcode-cn.com/explore/learn/card/queue-stack/216/queue-first-in-first-out-data-structure/863/
 */

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

    front() {
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
        console.log('1', q.front());
    }
    q.deQueue();
    if (!q.isEmpty()) {
        console.log('2', q.front());
    }
    q.deQueue();
    if (!q.isEmpty()) {
        console.log('3', q.front());
    }
}



