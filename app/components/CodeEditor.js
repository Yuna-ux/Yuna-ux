import Editor from '@monaco-editor/react'

export default function CodeEditor({ value, onChange }) {
  return (
    <div className="border rounded overflow-hidden" style={{ height: '400px' }}>
      <Editor
        language="lua"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on'
        }}
      />
    </div>
  )
}
