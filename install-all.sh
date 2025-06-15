#!/bin/bash

echo "🚀 Installing dependencies for all projects..."

echo "📦 Installing React TypeScript (Webpack) dependencies..."
cd react-webpack-ts && npm install && cd ..

echo "📦 Installing React TypeScript (Vite) dependencies..."
cd react-vite-ts && npm install && cd ..

echo "📦 Installing Angular dependencies..."
cd angular-app && npm install && cd ..

echo "📦 Installing Vue 3 TypeScript dependencies..."
cd vue3-ts && npm install && cd ..

echo "📦 Installing Vue 2 TypeScript dependencies..."
cd vue2-ts && npm install && cd ..

echo "✅ All dependencies installed successfully!"
echo ""
echo "🎯 To run the projects:"
echo "React (Webpack): cd react-webpack-ts && npm start"
echo "React (Vite): cd react-vite-ts && npm run dev"
echo "Angular: cd angular-app && ng serve"
echo "Vue 3: cd vue3-ts && npm run dev"
echo "Vue 2: cd vue2-ts && npm run serve" 