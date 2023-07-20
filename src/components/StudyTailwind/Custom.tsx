// 5-自定义样式

export default function Custom() {
  return (
    <div className="chapter">
      <div className="item bg-[#008899]">使用任意值样式</div>
      <div className="item hover:[mask-type:alpha]">
        任意属性（需要使用 TailwindCSS 未封装的属性）
      </div>
      <div className="item grid grid-cols-[1fr_500px_2fr]">
        使用下划线处理空格
      </div>
      <div className="item my-diy-class">
        <div>1.通过自定义类名（index.css/.my-diy-class）使用自定义样式</div>
        <div>2.使用 screen 函数</div>
      </div>
    </div>
  );
}
