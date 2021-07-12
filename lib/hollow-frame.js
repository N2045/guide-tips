class HollowFrame {
    constructor() {
        // 镂空框
        this.$frame = document.createElement("div");
        // 位置
        this.position = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
        // Array<Element> 显示在 镂空框 中的元素
        this.els = [];
    }
    init() {
        let shadowLength = this.getmax(document.documentElement.scrollHeight, document.body.scrollHeight);
        shadowLength = shadowLength * 2;

        const cssObj = {
            boxSizing: "content-box",
            boxShadow: `rgb(33 33 33 / 60%) 0px 0px 1px 1px, rgb(33 33 33 / 80%) 0px 0px 0px ${shadowLength}px`,
            padding: "5px",
            margin: "-5px 0 0 -5px",
            transition: "left 0.3s ease,right 0.3s ease,top 0.3s ease,bottom 0.3s ease,width 0.3s ease,height 0.3s ease",
            borderRadius: "6px",
            position: "absolute",
            zIndex: "90000"
        }
        this.setStyle(cssObj);

        document.body.appendChild(this.$frame);
    }
    /**
     * 选择 需要显示的 元素
     * @param {Array} list 元素选择器
     */
    selectEls(list) {
        this.els = list.map(item => {
            return document.querySelector(item);
        });
    }
    /**
     * 获取 m,n中的小值
     * @param {Number} m 
     * @param {Number} n 
     * @returns {Number}
     */
    getmin(m, n) {
        return (m > n) ? n : m;
    }
    /**
     * 获取 m,n中的大值
     * @param {Number} m 
     * @param {Number} n 
     * @returns {Number}
     */
    getmax(m, n) {
        return (m < n) ? n : m;
    }
    /**
     * 给 镂空框 设置css
     * @param {Object} cssObj css对象
     */
    setStyle(cssObj) {
        Object.keys(cssObj).forEach(K => {
            this.$frame.style[K] = cssObj[K];
        });
    }
    /**
     * 计算 需要显示元素 的位置
     * @returns {Object} {top,bottom,left,right}
     */
    calculationPosition() {
        let position = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
        this.els.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (index === 0) {
                position = {
                    top: rect.top,
                    bottom: rect.bottom,
                    left: rect.left,
                    right: rect.right
                }
            } else {
                const { top, bottom, left, right } = position;
                position = {
                    top: this.getmin(top, rect.top),
                    bottom: this.getmax(bottom, rect.bottom),
                    left: this.getmin(left, rect.left),
                    right: this.getmax(right, rect.right)
                }
            }
        });
        const { top, bottom, left, right } = position;
        position = {
            top: top + window.scrollY,
            bottom: bottom + window.scrollY,
            left: left + window.scrollX,
            right: right + window.scrollX
        }
        return position;
    }
    hfRender() {
        const position = this.calculationPosition();
        this.position = position;

        const { top, bottom, left, right } = position;

        const cssObj = {
            top: top + "px",
            left: left + "px",
            width: (right - left) + "px",
            height: (bottom - top) + "px",
        }
        this.setStyle(cssObj);
    }
    destroy() {
        this.$frame.remove();
    }
}

module.exports = HollowFrame;