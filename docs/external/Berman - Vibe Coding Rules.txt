* Always check for a PRD (Product Requirements Document) before starting a new task and follow it closely
* Look for comprehensive project documentation to understand requirements before making changes
* Focus only on code areas relevant to the assigned task
* Prefer iterating on existing code rather than creating new solutions
* Keep solutions simple and avoid introducing unnecessary complexity
* If you run into issues that take multiple iterations to fix. After you fix it, write up a description of the problem and how we fixed it and store it in a folder called "fixes", in an individual .md file with the name of the issue. Only do this for major issues and solutions.
* For issues that are taking multiple iterations to fix, check the fixes folder for previous fixes and see if the same issue has been fixed before.
* Keep a running list of patterns and technology used in the README.md file
* Reference the README.md file for patterns and technology used in the project
* If you run into the same persistent error, write logs and console messages to help track down the issue, and remember to check the logs after you make changes to see if the issue is resolved.
* If you are struggling with some piece of code, or aren't 100% sure on how to implement something, you can always use the firecrawl tool to research solutions.
* All tests should always pass before deploying to production. If they don't, make sure you notify me.
* Keep files under 300 lines of code; refactor when approaching this limit
* Maintain a clean, organized codebase
* Avoid code duplication by checking for similar existing functionality
* Write thorough tests for all major functionality
* Consider different environments (dev, test, prod) when writing code
* Unless explicitly instructed, instead of trying to gracefully handle an error or failure, make sure to fix the underlying issue.
* When being asked to refactor, make sure to look for duplicate code, duplicate files, and similar existing functionality. Also do not copy files and rename them so that we have two files, instead just edit the file that already exists.
* Kill all related running servers before starting a new one
* Always start a new server after making changes to allow for testing
* Make only requested changes or changes you're confident are well understood
* Consider what other code areas might be affected by your changes
* Don't drastically change existing patterns without explicit instruction
* Never leave unstaged/untracked files after committing to git
* Don't create new branches unless explicitly requested
* Never commit .env files to version control
* Never overwrite .env files without first asking and confirming
* Avoid writing one-time scripts in permanent files
* Don't mock data except for tests (never for dev or prod environments)
* Exhaust all options using existing implementations before introducing new patterns
* If introducing a new pattern to replace an old one, remove the old implementation
* Never name files "improved-something" or "refactored-something"