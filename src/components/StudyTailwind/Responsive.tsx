// 2-使用响应式布局

export default function Responsive() {
  return (
    <div className="chapter">
      <div className="item 2xl:text-red-500 sm:text-red-100 md:text-red-200 lg:text-red-300 xl:text-red-400">
        根据屏幕大小，从sm、md、lg、xl、2xl，字体颜色逐渐加深
      </div>
      <div className="item text-red-100 sm:max-md:text-red-900">
        sm到md范围内，字体为red-900，正常下为red-100
      </div>
      <div className="item mine:text-red-300 his:text-red-600 her:text-red-900">
        可以通过 theme 配置，自定义响应式前缀。此处mine、his、her都为自定义。
      </div>
      <div className="max-[200px]:text-red-900 min-[100px]:text-red-100">
        使用max、min + 具体值来定义范围内的样式
      </div>
    </div>
  );
}
