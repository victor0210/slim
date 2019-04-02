# Contribution Guide

- fork main warehouse to personal github
- clone personal warehouse address to local
- code establishes branch for development
- commit & push submits the changed code and uploads it to its own warehouse address
- commit pull request to the main repository with branch master

**Attention**: When submitting a merge code request, ci will automatically run the unit test and the e2e test and only the code after passing the test may be merged.
You can manually test it locally before uploading the code. The command is as follows

```bash
npm run test && npm run cypress:ci
```

If the new feature affects the previous test case, please update the test case of the new code, thank you very much.
