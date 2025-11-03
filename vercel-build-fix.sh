#!/bin/bash
chmod +x node_modules/.bin/vite || echo 'chmod failed'
npm run vite-build
