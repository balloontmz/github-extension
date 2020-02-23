/*global chrome*/
console.log('这里进入 content 测试')

console.log('当前的页面为:')

console.log(document)

console.log('页面上的所有 a 标签值为:')

console.log(document.getElementsByTagName('a'))

let aArr = document.getElementsByTagName('a')
let arr = []

for (let i = 0; i < aArr.length; i++) {
    const aEle = aArr[i];
    if (aEle.href.search('github.com') !== -1) {

        arr = arr.concat([aEle.href])
    }

}

console.log('截取出来的链接数组为:')

console.log(arr)

chrome.storage.sync.set({ githubExtensionLinkArr: arr }, function () {
    console.log('存入 storage的数组为: ')
    console.log(arr)
})