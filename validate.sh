#!/bin/bash

# Check for TypeScript errors
echo "Checking for TypeScript errors..."
if ! npx tsc ; then
  echo "TypeScript errors found."
  exit 1
fi
echo "TypeScript check passed."

# Check for Material-UI theme errors
# echo "Checking Material-UI theme..."
# if ! npx jest --testPathPattern='theme.test.ts' ; then
#   echo "Material-UI theme errors found."
#   exit 1
# fi
# echo "Material-UI theme check passed."

# Check for Bootstrap CSS errors
# echo "Checking Bootstrap CSS..."
# if ! npx postcss --config postcss.config.js ; then
#   echo "Bootstrap CSS errors found."
#   exit 1
# fi
# echo "Bootstrap CSS check passed."

# Check for HTML errors
echo "Checking HTML..."
if ! npx htmlhint ; then
  echo "HTML errors found."
  exit 1
fi
echo "HTML check passed."

# Check for React component errors
echo "Checking React components..."
if ! npx jest --testPathPattern='component.tsx' ; then
  echo "React component errors found."
  exit 1
fi
echo "React component check passed."

echo "Validation succeeded!"
