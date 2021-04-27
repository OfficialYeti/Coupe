# Coupe

# Current Tasks:

1. As an anonymous i should create account using google autentication
1.1. Should not gather any of google personal information.
2. As an user i should log in using google authentication.

# Side notes:
	- temporary postgres docker run command:
  `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`

  27.04.2021
  I created database with simple dbcontext
  Now I need to send message from idsrv to account module that i would like to create a new user.