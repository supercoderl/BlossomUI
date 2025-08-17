import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Space, Divider, message } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  LinkOutlined,
  PictureOutlined,
  RedoOutlined,
  UndoOutlined,
  ClearOutlined,
  SaveOutlined
} from '@ant-design/icons';

interface QuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ 
  value = '', 
  onChange, 
  placeholder = 'Start writing your content here...',
  disabled = false 
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<any>(null);
  
  type QuillFormats = {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    align?: string;
    list?: string;
    [key: string]: any;
  };
  
  const [selectedFormat, setSelectedFormat] = useState<QuillFormats>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadQuill = async () => {
      if (typeof window === 'undefined') return;
      if (!editorRef.current) return;
      if (quillRef.current) return; // Already initialized

      try {
        const Quill = (await import('quill')).default;

        // Clear any existing content
        editorRef.current.innerHTML = '';
        editorRef.current.className = '';

        const quill = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: false,
            history: { delay: 1000, maxStack: 50, userOnly: true }
          },
          placeholder,
          readOnly: disabled,
          formats: [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike',
            'color', 'background',
            'align', 'list', 'indent',
            'blockquote', 'code-block',
            'script', 'link', 'image', 'video'
          ]
        });

        // Handle text changes
        quill.on('text-change', () => {
          const html = quill.root.innerHTML;
          // Only trigger onChange if content actually changed and we have a handler
          if (onChange && html !== value) {
            onChange(html);
          }
        });

        // Handle selection changes for toolbar updates
        quill.on('selection-change', (range) => {
          if (range) {
            setSelectedFormat(quill.getFormat(range));
          } else {
            setSelectedFormat({});
          }
        });

        quillRef.current = quill;
        setIsReady(true);

        // Set initial content if provided
        if (value && value.trim()) {
          quill.root.innerHTML = value;
        }
      } catch (error) {
        console.error('Failed to load Quill editor:', error);
      }
    };

    loadQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
        setIsReady(false);
      }
    };
  }, [placeholder, disabled]);

  // Update editor content when value prop changes
  useEffect(() => {
    if (quillRef.current && isReady && value !== quillRef.current.root.innerHTML) {
      // Only update if editor doesn't have focus to avoid cursor jumping
      if (!quillRef.current.hasFocus()) {
        quillRef.current.root.innerHTML = value || '';
      }
    }
  }, [value, isReady]);

  // Custom formatting functions
  const applyFormat = (format: string, formatValue: boolean | string | undefined = true) => {
    if (quillRef.current && !disabled) {
      const range = quillRef.current.getSelection();
      if (range) {
        quillRef.current.format(format, formatValue);
        quillRef.current.focus();
      }
    }
  };

  const insertLink = () => {
    if (disabled) return;
    
    const url = prompt('Enter URL:');
    if (url && quillRef.current) {
      const range = quillRef.current.getSelection();
      if (range) {
        quillRef.current.format('link', url);
        quillRef.current.focus();
      }
    }
  };

  const insertImage = () => {
    if (disabled) return;
    
    const url = prompt('Enter image URL:');
    if (url && quillRef.current) {
      const range = quillRef.current.getSelection();
      if (range) {
        quillRef.current.insertEmbed(range.index, 'image', url);
        quillRef.current.focus();
      }
    }
  };

  const clearFormatting = () => {
    if (quillRef.current && !disabled) {
      const range = quillRef.current.getSelection();
      if (range) {
        quillRef.current.removeFormat(range.index, range.length);
        quillRef.current.focus();
      }
    }
  };

  const undo = () => {
    if (quillRef.current && !disabled) {
      quillRef.current.history.undo();
    }
  };

  const redo = () => {
    if (quillRef.current && !disabled) {
      quillRef.current.history.redo();
    }
  };

  const saveContent = () => {
    if (quillRef.current) {
      const delta = quillRef.current.getContents();
      const html = quillRef.current.root.innerHTML;
      console.log('Delta:', delta);
      console.log('HTML:', html);
      message.success('Content saved to console!');
    }
  };

  const getContentStats = () => {
    if (quillRef.current) {
      const text = quillRef.current.getText();
      const words = text.trim().split(/\s+/).filter((word: string) => word.length > 0).length;
      const characters = text.length;
      return { words, characters: Math.max(0, characters - 1) }; // -1 to exclude trailing newline
    }
    return { words: 0, characters: 0 };
  };

  const stats = getContentStats();

  return (
    <div className="bg-gray-50">
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Words: {stats.words} | Characters: {stats.characters}
            </div>
          </div>
        }
        className="shadow-lg"
      >
        {/* Custom Toolbar */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-2 items-center">
            {/* History Controls */}
            <Space.Compact>
              <Button
                icon={<UndoOutlined />}
                onClick={undo}
                title="Undo"
                size="small"
                disabled={disabled}
              />
              <Button
                icon={<RedoOutlined />}
                onClick={redo}
                title="Redo"
                size="small"
                disabled={disabled}
              />
            </Space.Compact>

            <Divider type="vertical" />

            {/* Format Buttons */}
            <Space.Compact>
              <Button
                icon={<BoldOutlined />}
                onClick={() => applyFormat('bold')}
                type={selectedFormat.bold ? 'primary' : 'default'}
                size="small"
                title="Bold"
                disabled={disabled}
              />
              <Button
                icon={<ItalicOutlined />}
                onClick={() => applyFormat('italic')}
                type={selectedFormat.italic ? 'primary' : 'default'}
                size="small"
                title="Italic"
                disabled={disabled}
              />
              <Button
                icon={<UnderlineOutlined />}
                onClick={() => applyFormat('underline')}
                type={selectedFormat.underline ? 'primary' : 'default'}
                size="small"
                title="Underline"
                disabled={disabled}
              />
              <Button
                icon={<StrikethroughOutlined />}
                onClick={() => applyFormat('strike')}
                type={selectedFormat.strike ? 'primary' : 'default'}
                size="small"
                title="Strikethrough"
                disabled={disabled}
              />
            </Space.Compact>

            <Divider type="vertical" />

            {/* Alignment */}
            <Space.Compact>
              <Button
                icon={<AlignLeftOutlined />}
                onClick={() => applyFormat('align', false)}
                type={!selectedFormat.align ? 'primary' : 'default'}
                size="small"
                title="Align Left"
                disabled={disabled}
              />
              <Button
                icon={<AlignCenterOutlined />}
                onClick={() => applyFormat('align', 'center')}
                type={selectedFormat.align === 'center' ? 'primary' : 'default'}
                size="small"
                title="Align Center"
                disabled={disabled}
              />
              <Button
                icon={<AlignRightOutlined />}
                onClick={() => applyFormat('align', 'right')}
                type={selectedFormat.align === 'right' ? 'primary' : 'default'}
                size="small"
                title="Align Right"
                disabled={disabled}
              />
            </Space.Compact>

            <Divider type="vertical" />

            {/* Lists */}
            <Space.Compact>
              <Button
                icon={<UnorderedListOutlined />}
                onClick={() => applyFormat('list', 'bullet')}
                type={selectedFormat.list === 'bullet' ? 'primary' : 'default'}
                size="small"
                title="Bullet List"
                disabled={disabled}
              />
              <Button
                icon={<OrderedListOutlined />}
                onClick={() => applyFormat('list', 'ordered')}
                type={selectedFormat.list === 'ordered' ? 'primary' : 'default'}
                size="small"
                title="Numbered List"
                disabled={disabled}
              />
            </Space.Compact>

            <Divider type="vertical" />

            {/* Media and Links */}
            <Space.Compact>
              <Button
                icon={<LinkOutlined />}
                onClick={insertLink}
                size="small"
                title="Insert Link"
                disabled={disabled}
              />
              <Button
                icon={<PictureOutlined />}
                onClick={insertImage}
                size="small"
                title="Insert Image"
                disabled={disabled}
              />
            </Space.Compact>

            <Divider type="vertical" />

            {/* Utility */}
            <Space.Compact>
              <Button
                icon={<ClearOutlined />}
                onClick={clearFormatting}
                size="small"
                title="Clear Formatting"
                disabled={disabled}
              />
              <Button
                icon={<SaveOutlined />}
                onClick={saveContent}
                type="primary"
                size="small"
                title="Save Content"
                disabled={disabled}
              />
            </Space.Compact>
          </div>
        </div>

        {/* Quill Editor Container */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div 
            ref={editorRef} 
            style={{ 
              minHeight: '400px',
              opacity: disabled ? 0.6 : 1 
            }} 
          />
        </div>

        {/* Content Preview */}
        {value && (
          <div className="mt-6">
            <Card
              title="Content Preview"
              size="small"
              className="bg-gray-50"
            >
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </Card>
          </div>
        )}
      </Card>

      {/* Load Quill CSS */}
      <style jsx global>{`
        @import url('https://cdn.quilljs.com/1.3.6/quill.snow.css');
        
        .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          background-color: #f8f9fa;
        }
        
        .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .ql-editor {
          line-height: 1.6;
          font-size: 14px;
        }
        
        .ql-editor::before {
          color: #aaa;
          font-style: italic;
        }
        
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        .prose p {
          margin-bottom: 1em;
        }
        
        .prose ul, .prose ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        .prose blockquote {
          border-left: 4px solid #ddd;
          margin: 1em 0;
          padding-left: 1em;
          color: #666;
          font-style: italic;
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 1em 0;
        }
        
        .prose a {
          color: #1890ff;
          text-decoration: none;
        }
        
        .prose a:hover {
          text-decoration: underline;
        }
        
        .prose code {
          background-color: #f1f3f4;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: 'Monaco', 'Consolas', monospace;
        }
        
        .prose pre {
          background-color: #f8f9fa;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
          border: 1px solid #e1e4e8;
        }
      `}</style>
    </div>
  );
};

export default QuillEditor;