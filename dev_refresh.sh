#!/bin/bash

echo "🔨 Building module (TypeScript)..."
npm run build

echo "📦 Reinstalling module in example app..."
cd example
rm -rf node_modules package-lock.json
npm install ../

echo "🚀 Starting Metro with cache reset..."
npx react-native start --reset-cache
