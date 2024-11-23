VIRTUAL_ENV=env
MANAGE_PY=python3 manage.py
PIP_BIN=pip3
DOCKER_EXEC=docker compose exec web 
DOCKER_COMPOSE=docker compose


install:
	$(DOCKER_EXEC) poetry install

superuser:
	$(DOCKER_EXEC) $(MANAGE_PY) createsuperuser

shell:
	$(DOCKER_EXEC) $(MANAGE_PY) shell_plus

shell_plus:
	$(DOCKER_EXEC) $(MANAGE_PY) shell_plus --notebook

down:
	$(DOCKER_COMPOSE) down

up:
	${DOCKER_COMPOSE} up

up_simple:
	${DOCKER_COMPOSE} up nginx web

up_django:
	${DOCKER_COMPOSE} up web

up_no_beat:
	${DOCKER_COMPOSE} up nginx web celery rabbitmq redis

up_queue:
	${DOCKER_COMPOSE} up nginx rabbitmq redis flower

build:
	${DOCKER_COMPOSE} build

test:
	$(DOCKER_EXEC) $(MANAGE_PY) test --keepdb integrator_engine fingo_app_backend

one_test:
	$(DOCKER_EXEC) $(MANAGE_PY) test --keepdb $(TEST_PATH)

test_update:
	$(DOCKER_EXEC) $(MANAGE_PY) test --keepdb --snapshot-update fingo_app_backend

makemigrations:
	$(DOCKER_EXEC) $(MANAGE_PY) makemigrations

rebase_migration:
	$(DOCKER_EXEC) $(MANAGE_PY) rebase_migration $(APP)

check:
	$(DOCKER_EXEC) $(MANAGE_PY) makemigrations --check

empty_migration:
	$(DOCKER_EXEC) $(MANAGE_PY) makemigrations $(APP) --name $(NAME) --empty 

merge:
	$(DOCKER_EXEC) $(MANAGE_PY) makemigrations --merge

migrate:
	$(DOCKER_EXEC) $(MANAGE_PY) migrate $(APP) $(MIGRATION)

fake_migration:
	$(DOCKER_EXEC) $(MANAGE_PY) migrate $(APP) $(MIGRATION) --fake

coverage_report:
	$(DOCKER_EXEC) coverage report -m

coverage_html:
	$(DOCKER_EXEC) coverage html

showmigrations:
	$(DOCKER_EXEC) $(MANAGE_PY) showmigrations

bash:
	$(DOCKER_EXEC) bash

delete_branches:
	git branch | grep -v "development" | grep -v "master" | grep -v "staging" | xargs git branch -D

collectstatic:
	$(DOCKER_EXEC) $(MANAGE_PY) collectstatic --noinput
