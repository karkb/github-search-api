# github-search-api

# This is github search api, this api to search github users or repositories or issues.

### The problem here is to prevent too many requrest white user is typing the keyword to search.

### To solve this issues the requests trigger in setTimeOut to control the requests to server due to user will type quickly in the keyboard and it will trigger api call only after the user stopped typing in the keybaord for 500ms

### This api will cache the results from github for 2 hours and frontend also caching the results using redux persist.

### The response from github is transformed to what data needed only in fronend, so that data bandwidth will be lesser and this help data moved faster.

### This search is giving instant search results.

### To view the api document online in swagger go here https://app.swaggerhub.com/apis-docs/bakr.baroudi/github-search-api/1.0.0#
