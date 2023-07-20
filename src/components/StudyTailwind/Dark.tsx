// 3-使用颜色主题

export default function Dark() {
  return (
    <div className="chapter">
      <div className="item bg-white text-black dark:bg-black dark:text-white">
        浅色主题下，白色背景，黑色字体。深色主题下，黑色背景，白色字体
      </div>
    </div>
  );
}
