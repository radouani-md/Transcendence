COMPOSE = docker compose -f compose.dev.yaml

all :
	$(COMPOSE) up --build -d


up : 
	$(COMPOSE) up --build -d

build :
	$(COMPOSE) build

down :
	$(COMPOSE) down
ps :
	$(COMPOSE) ps

clean :
	$(COMPOSE) down --rmi all

fclean: clean
	$(COMPOSE) down 

re : fclean all