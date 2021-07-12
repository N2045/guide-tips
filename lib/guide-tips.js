require("./guide-tips.css");
const HollowFrame = require("./hollow-frame.js");

class GuideTips {
    /**
     * @param {Object} option - foo
     * @param {Array<Object>} option.guideList 引导步骤配置列表 [ els:Array<String>,title:String,context:String,center:Boolean ]
     * @param {Number} option.activeIndex 当前活动项
     * @param {Boolean} option.mask 是否开启遮罩
     * @param {String} option.backText 上一步按钮文案
     * @param {String} option.nextText 下一步按钮文案
     * @param {String} option.closeText 结束按钮文案
     */
    constructor({ guideList = [], activeIndex = 0, mask = true, backText = "back", nextText = "next", closeText = "close" }) {
        // 镂空框 实例
        this.hfInstance = new HollowFrame();
        // tips弹窗
        this.$tips = this.createTips();
        if (mask) {
            const $mask = this.createNode("div", "tips_mask");
            this.$tips.appendChild($mask);
        }
        // 引导 列表
        // option: {
        //     els:需要显示的元素选择器数组,
        //     title:本次tips弹窗标题,
        //     context:本次tips内容,
        //     center:内容是否滚动至屏幕中间 
        // }
        this.guideList = guideList;
        this.activeIndex = activeIndex;
        this.backText = backText;
        this.nextText = nextText;
        this.closeText = closeText;

        this.resizePointer = this.resizeHandle.bind(this);
        window.addEventListener("resize", this.resizePointer);
    }
    /**
     * 创建 tips弹窗
     * @returns {Element} tips弹窗dom节点
     */
    createTips() {
        const $tips = this.createNode("div", "tips");

        // tips 头部节点
        const $head = this.createNode("div", "tips_head");
        // tips_head_title
        const $head_title = this.createNode("p", "tips_head_title");
        $head.appendChild($head_title);
        $head.$head_title = $head_title;
        // tips_head_icon
        const $head_icon = this.createNode("span", "tips_head_icon");
        $head_icon.innerHTML = "×";
        $head_icon.onclick = () => {
            this.close();
        };
        $head.appendChild($head_icon);
        $head.$head_icon = $head_icon;

        $tips.appendChild($head);
        $tips.$head = $head;

        // tips 内容节点
        const $content = this.createNode("div", "tips_content");
        $tips.appendChild($content);
        $tips.$content = $content;

        // tips 底部节点
        const $foot = this.createNode("div", "tips_foot");
        // tips_back
        const $back = this.createNode("button", "tips_back");
        $back.onclick = () => {
            this.back();
        };
        $foot.appendChild($back);
        $foot.$back = $back;
        // tips_next
        const $next = this.createNode("button", "tips_next");
        $next.onclick = () => {
            this.next();
        };
        $foot.appendChild($next);
        $foot.$next = $next;

        $tips.appendChild($foot);
        $tips.$foot = $foot;

        // tips 箭头
        const $arrow = this.createNode("div", "tips_arrow");
        $tips.appendChild($arrow);
        $tips.$arrow = $arrow;

        return $tips;
    }
    /**
     * 创建dom节点
     * @param {String} tagName 标签名
     * @param {String} className class名
     * @returns {Element} 创建的dom节点
     */
    createNode(tagName, className) {
        const node = document.createElement(tagName);
        node.className = className;
        return node;
    }
    /**
     * 给 元素 设置css
     * @param {Element} 需要设置css的元素节点
     * @param {Object} cssObj css对象
     */
    setStyle(el, cssObj) {
        Object.keys(cssObj).forEach(K => {
            el.style[K] = cssObj[K];
        });
    }
    render(resize) {
        const option = this.guideList[this.activeIndex];

        if (!resize) {
            this.hfInstance.selectEls(option.els);

            this.$tips.$head.$head_title.innerHTML = option.title || "";
            this.$tips.$content.innerHTML = option.context || "";

            this.checkStepBtn();
        }

        this.hfInstance.hfRender();

        // 计算tips弹窗位置
        const { top, bottom, left, right } = this.hfInstance.position;

        let tipsCss = {
            top: "auto",
            bottom: "auto",
            left: "auto",
            right: "auto",
        }

        const tipsH = this.$tips.clientHeight,
            tipsW = this.$tips.clientWidth,
            docSH = document.documentElement.scrollHeight || document.body.scrollHeight,
            docSW = document.documentElement.scrollWidth || document.body.scrollWidth,
            docCH = document.documentElement.clientHeight || document.body.clientHeight,
            docCW = document.documentElement.clientWidth || document.body.clientWidth;

        if (tipsH + bottom + 30 > docSH) {
            tipsCss.top = top - tipsH - 20 + "px";
            this.$tips.$arrow.classList.remove("top");
            this.$tips.$arrow.classList.add("bottom");
        } else {
            tipsCss.top = bottom + 20 + "px";
            this.$tips.$arrow.classList.remove("bottom");
            this.$tips.$arrow.classList.add("top");
        }

        if (tipsW + left + 10 > docSW) {
            tipsCss.left = right - tipsW + "px";
            this.$tips.$arrow.classList.remove("left");
            this.$tips.$arrow.classList.add("right");
        } else {
            tipsCss.left = left + "px";
            this.$tips.$arrow.classList.remove("right");
            this.$tips.$arrow.classList.add("left");
        }

        this.setStyle(this.$tips, tipsCss);

        if (option.center) {
            const x = left - (docCW / 2 - (right - left) / 2);
            const y = top - (docCH / 2 - (bottom - top) / 2);
            window.scrollTo(x, y);
        }
    }
    resizeHandle() {
        clearTimeout(this.resizing);
        this.resizing = setTimeout(() => {
            this.render(true);
        }, 300);
    }
    /**
     * 底部按钮显示隐藏
     * @param {String} type back、next
     * @param {Boolean} show 显示/隐藏
     */
    footBtnsShow(type, show) {
        let $btn;
        if (type === "back") {
            $btn = this.$tips.$foot.$back;
        } else if (type === "next") {
            $btn = this.$tips.$foot.$next;
        }
        if (show) {
            $btn.style.display = "block";
        } else {
            $btn.style.display = "none";
        }
    }
    // 开始
    begin() {
        this.hfInstance.init();
        this.render();
        document.body.appendChild(this.$tips);
    }
    // 上一步 返回
    back() {
        this.activeIndex--;
        this.render();
    }
    // 下一步
    next() {
        this.activeIndex++;
        this.render();
    }
    // 检测 back、next按钮是否需要
    checkStepBtn() {
        if (this.activeIndex + 1 >= this.guideList.length) {
            this.$tips.$foot.$next.innerHTML = this.closeText;
            this.$tips.$foot.$next.onclick = () => {
                this.close();
            }
        } else {
            this.$tips.$foot.$next.innerHTML = this.nextText;
            this.$tips.$foot.$next.onclick = () => {
                this.next();
            }
        }
        this.$tips.$foot.$back.innerHTML = this.backText;
        if (this.activeIndex <= 0) {
            this.footBtnsShow("back", false);
        } else {
            this.footBtnsShow("back", true);
        }
    }
    hide() {
        this.hfInstance.$frame.style.display = "none";
        this.$tips.style.display = "none";
    }
    show() {
        this.hfInstance.$frame.style.display = "block";
        this.$tips.style.display = "block";
    }
    // 关闭
    close() {
        this.hide();
        this.closeAfter();
    }
    closeAfter() { }
    destroy() {
        window.removeEventListener("resize", this.resizePointer);
        this.hfInstance.destroy();
        this.hfInstance = null;
        this.$tips.remove();
        this.$tips = null;
        this.guideList = [];
        this.activeIndex = 0;
    }
}

module.exports = GuideTips;