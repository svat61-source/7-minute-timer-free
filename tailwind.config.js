module.exports = {
  content: ['./index.html', './build/*.html'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#09090b', 900: '#0d0d11', 850: '#131318', 800: '#1a1a20', 700: '#26262f' }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      }
    }
  },
  plugins: []
};
