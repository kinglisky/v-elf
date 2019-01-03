# v-elf

依赖于 `popper.js` 开发一个 `tooltip` 工具，支持大体功能为：

指令支持：

1. 直接绑定一个需要提示的文本

```html
<span v-elf="'这里有些提示信息'"></span>
```

2. 直接绑定同一个父级组件内部的组件或者 `vnode` 节点

```html
<span v-elf:popup-ref></span>
<div ref="popup-ref">这里有些提示信息</div>
<span v-elf:custom-popup></span>
<custom-popup ref="custom-popup" @confirm="confirm" @cancel="cancel"></custom-popup>
```

3. 直接绑定一些配置项

```html
<span v-elf="{ theme: 'dark', content: '这里有些提示信息' }"></span>
<span v-elf="{ theme: 'dark', vnode: popupNode }"></span>
```

4. 其他的一些 `data` 配置支持：

```html
<span v-elf="'这里有些提示信息'" data-elf-class="custom-class"></span>
<span v-elf="'这里有些提示信息'" data-elf-placement="top,right"></span>
<span v-elf="'这里有些提示信息'" data-elf-trigger="click,hover"></span>
```

工具函数支持：

指令的支持应该是基于工具函数之上的：

```javascript
this.$popup({
  target: event.target,
  ref: this.$refs.customPopup,
  theme: 'dark',
  content: '这里有些提示信息',
  placement: ['top', 'right'],
});
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```
