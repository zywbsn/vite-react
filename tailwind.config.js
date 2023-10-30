/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}","./src/*.{html,js,jsx}"],
  theme: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false // 禁止 tailwind css 默认属性
  }
}

