### Object.assign 和 展开运算符 有什么区别? [# 细节]

区别在于 Object.assign 就地更改对象 (触发set)，而展开运算符 （...） 创建一个全新的对象，这将打破对象引用相等性

via [object-spread-vs-object-assign](https://stackoverflow.com/questions/32925460/object-spread-vs-object-assign)
