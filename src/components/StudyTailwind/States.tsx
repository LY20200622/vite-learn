// 1-适配不同状态的样式

import { useCallback, useRef, useState } from "react";

enum Chapter {
  PseudoClasses = "伪类",
  PseudoElements = "伪元素",
  MediaAndFeature = "媒体相关",
  ARIAStates = "无障碍技术",
  CustomModifiers = "自定义前缀",
  AdvancedTopics = "高级指引",
}

const CHAPTER_ARR: Chapter[] = [
  Chapter.PseudoClasses,
  Chapter.PseudoElements,
  Chapter.MediaAndFeature,
  Chapter.ARIAStates,
  Chapter.CustomModifiers,
  Chapter.AdvancedTopics,
];

export default function States() {
  const [cur, setCur] = useState(Chapter.PseudoClasses);
  const btnClick = useCallback(
    (chapter: Chapter) => () => {
      setCur(chapter);
    },
    []
  );
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // 伪类
  const _renderPseudoClasses = useCallback(() => {
    return (
      <div className="chapter">
        <div className="item bg-blue-100 hover:bg-blue-500">
          hover 改变背景色
        </div>
        <div className="item">
          单独控制第一个元素和最后一个元素的颜色
          <ul>
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i} className="first:text-red-300 last:text-red-600">
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="item">
          控制输入框 disabled 时候的样式
          <br />
          <input
            type="text"
            value="LLL"
            disabled
            className="disabled:cursor-not-allowed disabled:border-none disabled:bg-amber-400 disabled:p-2 disabled:text-blue-500"
          />
        </div>
        <div className="item">
          <div className="group p-5">
            <div className="text-red-300 group-hover:text-red-600">
              基于父元素 group，当 group hover的时候，改变字体颜色
            </div>
          </div>
          <div className="group/first p-5">
            <div className="group/second">
              <div className="text-red-300 group-hover/second:text-red-600">
                给外层 group 定义名称，基于指定名称的 group 改变字体颜色
              </div>
            </div>
          </div>
          <div className="is-mine group">
            <div className="text-blue-300 group-[.is-mine]:text-yellow-300">
              基于外层 group，且 group 的元素需要有 is-mine 类
            </div>
          </div>
          <div className="group">
            <div className="group-[.item_&]:text-blue-300">
              基于外层 group，且 group 的元素需为 item 的子元素
            </div>
          </div>
        </div>
        <div className="item">
          <div className="peer">peer-1</div>
          <div className="text-red-300 peer-hover:text-red-600">
            基于兄弟元素 peer-1 hover 改变字体颜色
          </div>
          <div className="peer/my-peer">peer-2</div>
          <div className="text-red-300 peer-hover/my-peer:text-red-600">
            给 peer-2 定义名称，基于特定的 peer hover 改变字体颜色
          </div>
          <div className="is-mine peer">peer-3</div>
          <div className="text-red-300 peer-[.is-mine]:text-red-600">
            基于 peer，且 peer 的元素需要有 is-mine 类
          </div>
          <div className="is-parent">
            <div className="peer">peer-4</div>
            <div className="text-red-300 peer-[.is-parent_&]:text-blue-600">
              基于 peer，且 peer 的元素需为 is-parent 的子元素
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  // 伪元素
  const _renderPseudoElements = useCallback(() => {
    return (
      <div className="chapter">
        <div className="item before:content-['前'] after:content-['后']">
          设置 before 和 after 伪元素的内容为 “前” 和 “后”
        </div>
        <div className="item">
          设置 placeholder 伪元素样式
          <br />
          <input
            className="border-none bg-blue-100 p-2 outline-none placeholder:italic placeholder:text-blue-300"
            placeholder="请输入"
          />
        </div>
        <div className="item">
          设置上传按钮样式
          <br />
          <input type="file" className="bg-blue-100 p-1 file:text-red-600" />
        </div>
        <div className="item">
          设置列表每项符号样式
          <ul className="list-disc space-y-3 pl-5 text-slate-500 marker:text-red-400">
            <li>List markers 1</li>
            <li>List markers 2</li>
            <li>List markers 3</li>
          </ul>
        </div>
        <div className="item selection:bg-red-300 selection:text-red-900">
          <p>设置选中框样式</p>
        </div>
        <div className="item text-left">
          <p
            className="first-letter:float-left first-letter:mr-3
  first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-line:uppercase first-line:tracking-widest
"
          >
            设置首字和首行样式设置首字和首行样式设置首字和首行样式设置首字和首行样式设置首字和首行样式设置首字和首行样式设置首字和首行样式
          </p>
        </div>
        <div className="item">
          <button
            onClick={() => {
              if (
                dialogRef.current &&
                typeof dialogRef.current?.showModal === "function"
              ) {
                dialogRef.current?.showModal();
              }
            }}
          >
            设置原生 dialog 背景样式
          </button>
          <dialog className="backdrop:bg-blue-50" ref={dialogRef}>
            <form method="dialog">
              <button
                onClick={() => {
                  if (
                    dialogRef.current &&
                    typeof dialogRef.current?.close === "function"
                  ) {
                    dialogRef.current?.close();
                  }
                }}
              >
                关闭
              </button>
            </form>
          </dialog>
        </div>
      </div>
    );
  }, []);

  // 媒体相关
  const _renderMediaAndFeature = useCallback(() => {
    return (
      <div className="chapter">
        <div className="item grid grid-cols-2 lg:grid-cols-3">
          根据 md、lg 区分样式
        </div>
        <div className="item text-yellow-300 dark:text-blue-300">
          根据浅色、深色模式区分样式
        </div>
        <div className="item motion-reduce:hidden">
          根据用户是否开启了动画减弱功能区分样式
        </div>
        <div className="item contrast-more:opacity-1000 opacity-100 contrast-less:opacity-10">
          根据用户是否开启了高对比度区分样式
        </div>
        <div className="item portrait:hidden">根据视图方向区分样式</div>
        <div className="item print:hidden">根据是否是打印机模式区分样式</div>
        <div className="item supports-flex: flex supports-[display:grid]:grid">
          <div>1. 根据某个属性是否被浏览器支持使用样式</div>
          <div>2. 在 theme/supports 中进行配置后，可以使用简写</div>
        </div>
      </div>
    );
  }, []);

  // 无障碍技术
  const _renderARIAStates = useCallback(() => {
    return (
      <div className="chapter">
        <div className="item">
          <div
            aria-checked="true"
            className="aria-checked:bg-sky-500 bg-green-500"
          >
            根据无障碍技术属性区分样式
          </div>
        </div>
        <div className="item">
          <div
            aria-sort="ascending"
            className="text-black aria-asc:text-red-600 aria-desc:text-yellow-600"
          >
            可在 theme/extend/aria 或者 theme/aria 中自定义 aria属性符
          </div>
        </div>
        <div className="item">
          <div
            data-size="active"
            className="text-black data-[size=active]:text-red-600"
          >
            根据 data-* 区分样式
          </div>
        </div>
        <div className="item">
          <div
            data-myName="LLL"
            className="text-black data-diyName:text-red-600"
          >
            可在 theme/data 中自定义缩写
          </div>
        </div>
        <div className="item">
          <div className="ltr:ml-3 rtl:mr-3">根据布局走向区分样式</div>
        </div>
        <div className="item">
          <details
            className="cursor-pointer select-none text-black open:text-red-600"
            open
          >
            根据 open 状态区分样式
          </details>
        </div>
      </div>
    );
  }, []);

  // 自定义前缀
  const _renderCustomModifiers = useCallback(() => {
    return (
      <div className="chapter">
        <div className="item">
          {[1, 2, 3].map((i) => (
            <div className="text-black [&:nth-child(3)]:text-red-600">
              {i} - 可以使用任意值前缀
            </div>
          ))}
        </div>
        <div className="item">
          {[1, 2, 3].map((i) => (
            <div className="text-black two:text-red-600">
              {i} - 可以在 plugins 中创建插件
            </div>
          ))}
        </div>
      </div>
    );
  }, []);

  // 高级指引
  const _renderAdvancedTopics = useCallback(() => {
    return (
      <div className="chapter">
        <div className="item utilities-div">
          在 index/@layer utilities 中自定义工具类
        </div>
      </div>
    );
  }, []);

  return (
    <div className="page">
      <div className="flex cursor-pointer items-center justify-center">
        {CHAPTER_ARR.map((chapter, index) => (
          <button
            key={index}
            className="m-10 flex-1 active:bg-amber-400"
            onClick={btnClick(chapter)}
          >
            {chapter}
          </button>
        ))}
      </div>
      {cur === Chapter.PseudoClasses && _renderPseudoClasses()}
      {cur === Chapter.PseudoElements && _renderPseudoElements()}
      {cur === Chapter.MediaAndFeature && _renderMediaAndFeature()}
      {cur === Chapter.ARIAStates && _renderARIAStates()}
      {cur === Chapter.CustomModifiers && _renderCustomModifiers()}
      {cur === Chapter.AdvancedTopics && _renderAdvancedTopics()}
    </div>
  );
}
