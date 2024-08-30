/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable react/display-name */
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
//import styled from 'styled-components';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  i18nChangeLanguage,
} from '@wangeditor/editor';
//import message from 'components/Alert';
//import axios from '@/services/index';

const WangEditor = forwardRef((props: any, ref: any) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // 编辑器内容
  const [html, setHtml] = useState(props.editorContent || '');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  i18nChangeLanguage('en');
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 排除的toolbar菜单
  toolbarConfig.excludeKeys = ['fullScreen'];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getHtmlContent = () => {
    return editor?.getHtml();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setHtmlContent = (htmlContent) => {
    editor?.insertText(htmlContent);
  };

  // TS 语法
  // 对外暴露方法，可以让父组件调用子组件的方法
  // 作用: 减少父组件获取子组件的DOM元素属性,只暴露给父组件需要用到的DOM方法
  // 参数1: 父组件传递的ref属性
  // 参数2: 返回一个对象,父组件通过ref.current调用对象中方法
  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    setHtml(props.editorContent); //设置编辑器内容
  }, [props.editorContent]);

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      if (editor) {
        (editor as any).destroy();
      }
      setEditor(null);
    };
  }, [editor]);

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: 'The length should be less than 100000...',
    //插入图片
    MENU_CONF: {
      uploadImage: {
        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 10 * 1024 * 1024, // 10M
        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 20,
        // 超时时间，默认为 10 秒
        timeout: 20 * 1000, // 20 秒
        // 用户自定义上传图片
        customUpload(file: any, insertFn: any) {
          const data = new FormData();
          data.append('file', file); // file 即选中的文件 主要就是这个传的参数---看接口要携带什么参数{ key :value}
          //const hide = message.loading('上传中...', 0);
          //这里写自己的接口

          fetch(`${process.env.apiHost}/uploadImg`, {
            method: 'POST',
            credentials: 'include',
            body: data,
          })
            .then((response) => response.json())
            .then((data) => {
              const url = `${process.env.apiHost}` + data.data;
              //console.log(url);
              insertFn(url); //插入图片，看返回的数据是什么
              //hide();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
    },
  };
  return (
    <div
      style={{
        border: '1px solid #ccc',
        zIndex: 100,
        width: '50rem',
      }}
      id="wangEditor"
    >
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={(editor) => {
          setHtml(editor.getHtml());
          props.saveHtmParams(editor.getHtml());
        }}
        mode="default"
        style={{ height: '500px' }}
      />
    </div>
  );
});
export default WangEditor;
