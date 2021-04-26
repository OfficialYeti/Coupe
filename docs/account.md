# Account module

## Use cases

1. Register Account
2. Get user info
3. Find Account

## Persistance

Database scheme [acc]

Account:
    Login
    Mail
    Claims -> how to manage claims?
        first user could be super user whos duty is to promote moderators admins etc
        role mapping or feature mapping? thats interesting...
        and how to propagate claims over other services
        carry claims in token but token is created by idp
        so when signing in idp should ask database or account service about user existence and current claims
