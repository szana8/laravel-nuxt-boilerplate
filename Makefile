up:
	docker compose up -d --force-recreate

bash-php:
	docker compose exec workspace bash

bash-nuxt:
	docker compose exec nuxt bash