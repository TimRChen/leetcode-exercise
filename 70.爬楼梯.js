/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const climb_stairs = function (i, n) {
        if (i > n) return 0;
        if (i === n) return 1;
        return climb_stairs(i + 1, n) + climb_stairs(i + 2, n);
    }
    return climb_stairs(0, n);
};

