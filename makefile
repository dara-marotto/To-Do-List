.PHONY: start

start:
	@if [ ! -f .env ]; then \
		cp .env-exemple .env; \
		echo "Created .env from .env-exemple"; \
	else \
		echo ".env already exists"; \
	fi
	@if [ -s "$$HOME/.nvm/nvm.sh" ]; then \
		echo "Using nvm to install/use Node 20"; \
		. $$HOME/.nvm/nvm.sh && nvm install 20 && nvm use 20 && npm install --legacy-peer-deps; \
	else \
		echo "nvm not found. Installing nvm..."; \
		curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash; \
		. $$HOME/.nvm/nvm.sh && nvm install 20 && nvm use 20 && npm install --legacy-peer-deps; \
	fi
	docker compose up -d
	sleep 5
	docker exec -it todo-list-api sh -c "npm run migration:run"
	docker compose logs -f